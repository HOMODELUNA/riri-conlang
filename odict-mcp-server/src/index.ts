import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { implOdictLookup } from "./register-function-odict.js";
import { lookupOptionsSchema } from "./odict-types-zod.js";
import { LookupOptions } from "./odict-types.js";

// Create server instance
const server = new McpServer({
  name: "odict",
  version: "1.0.0",
});

server.registerTool(
  "lookup",
  {
    description: "Look up entries in an OpenDictionary dictionary",
    inputSchema: {
      dict_path: z
        .string()
        .describe("Path to the OpenDictionary file (.odict)"),
      query: z
        .union([z.string(), z.array(z.string())])
        .describe("Search term(s) to look up"),
      ...lookupOptionsSchema.shape,
    },
  },
  async ({ dict_path, query, split, follow, insensitive }) => {
    const options: LookupOptions = {};
    if (split !== undefined) options.split = split;
    if (follow !== undefined) options.follow = follow;
    if (insensitive !== undefined) options.insensitive = insensitive;

    const results = await implOdictLookup(dict_path, query, options);

    if (!results || results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No entries found for "${typeof query === "string" ? query : query.join(", ")}" in ${dict_path}`,
          },
        ],
      };
    }

    const formattedResults = results.map((result) => {
      const entry = result.entry;
      const lines = [`Term: ${entry.term}`];
      if (result.directedFrom) {
        lines.push(`Directed from: ${result.directedFrom.term}`);
      }
      if (entry.rank !== undefined) {
        lines.push(`Rank: ${entry.rank}`);
      }
      if (entry.seeAlso) {
        lines.push(`See also: ${entry.seeAlso}`);
      }
      if (entry.etymologies.length > 0) {
        for (const etym of entry.etymologies) {
          if (etym.pronunciations.length > 0) {
            const pronunciations = etym.pronunciations
              .map((p) => p.value)
              .join(", ");
            lines.push(`Pronunciation: ${pronunciations}`);
          }
          if (etym.description) {
            lines.push(`Etymology: ${etym.description}`);
          }
          if (etym.senses.length > 0) {
            for (const sense of etym.senses) {
              lines.push(`  POS: ${sense.pos?.value || "unknown"}`);
              if (sense.lemma) {
                lines.push(`  Lemma: ${sense.lemma}`);
              }
              if (sense.definitions.length > 0) {
                for (const def of sense.definitions) {
                  if ("value" in def && def.value) {
                    lines.push(`    - ${def.value}`);
                  }
                  if ("examples" in def && def.examples.length > 0) {
                    for (const ex of def.examples) {
                      lines.push(`      Example: ${ex.value}`);
                    }
                  }
                }
              }
              if (sense.translations.length > 0) {
                const translations = sense.translations
                  .map((t) => `${t.lang}: ${t.value}`)
                  .join(", ");
                lines.push(`  Translations: ${translations}`);
              }
              if (sense.forms.length > 0) {
                const forms = sense.forms.map((f) => f.term).join(", ");
                lines.push(`  Forms: ${forms}`);
              }
            }
          }
        }
      }
      return lines.join("\n");
    });

    const odictText = `Lookup results for "${typeof query === "string" ? query : query.join(", ")}" in ${dict_path}:\n\n${formattedResults.join("\n---\n")}`;

    return {
      content: [
        {
          type: "text",
          text: odictText,
        },
      ],
    };
  },
);
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
