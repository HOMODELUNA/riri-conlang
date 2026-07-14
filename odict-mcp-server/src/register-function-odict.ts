import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp";
import { OpenDictionary } from "@odict/node";
import type {
	AnySchema,
	ZodRawShapeCompat,
} from "@modelcontextprotocol/sdk/server/zod-compat";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types";
import type { LookupOptions, LookupResult } from "./odict-types.js";

interface ToolConfig<
	OutputArgs extends ZodRawShapeCompat | AnySchema,
	InputArgs extends undefined | ZodRawShapeCompat | AnySchema = undefined,
> {
	name: string;
	config: {
		title?: string;
		description?: string;
		inputSchema?: InputArgs;
		outputSchema?: OutputArgs;
		annotations?: ToolAnnotations;
		_meta?: Record<string, unknown>;
	};
	cb: ToolCallback<InputArgs>;
}

export async function implOdictLookup(
	dict_path: string,
	query: string | string[],
	options?: LookupOptions,
): Promise<LookupResult[]> {
	const dict = await OpenDictionary.load(dict_path);
	const res = dict.lookup(query, options);
	return res;
}
