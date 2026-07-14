import { z } from "zod";
export interface LookupResult {
  entry: Entry;
  directedFrom?: Entry;
}

export interface Entry {
  term: string;
  rank?: number;
  seeAlso?: string;
  etymologies: Etymology[];
  media: MediaUrl[];
}
export interface Etymology {
  id?: string;
  pronunciations: Pronunciation[];
  description?: string;
  senses: Sense[];
}
export interface Sense {
  pos: EnumWrapper;
  lemma?: string;
  definitions: Array<Definition | Group>;
  tags: string[];
  translations: Translation[];
  forms: Form[];
}
export interface Definition {
  id?: string;
  value: string;
  examples: Example[];
  notes: Note[];
}
export interface Form {
  term: String;
  kind?: EnumWrapper;
  tags: string[];
}
export interface Group {
  id?: string;
  description: string;
  definitions: Definition[];
}
export interface Translation {
  lang: string;
  value: string;
}
export interface Example {
  value: string;
  translations: Translation[];
  pronunciations: Pronunciation[];
}
export interface Note {
  id?: string;
  value: string;
  examples: Example[];
}
export interface Pronunciation {
  kind?: EnumWrapper;
  value: string;
  media: MediaUrl[];
}
export interface MediaUrl {
  src: string;
  mimeType?: string;
  description?: string;
}
export interface Token {
  lemma: string;
  language?: string;
  entries: LookupResult[];
  kind: string;
  script: string;
  start: number;
  end: number;
}
export interface EnumWrapper {
  name: string;
  variant: string;
  value: string;
}
export interface LoadOptions {
  configDir?: string;
  remote?: RemoteLoadOptions;
}

export interface RemoteLoadOptions {
  outDir?: string;
  caching?: boolean;
  retries?: number;
}

export interface SaveOptions {
  compress?: CompressOptions;
}

export interface CompressOptions {
  quality?: number;
  windowSize?: number;
}

export interface LookupOptions {
  split?: number;
  follow?: boolean;
  insensitive?: boolean;
}

export interface IndexOptions {
  directory?: string;
  memory?: number;
  overwrite?: boolean;
}

export interface SearchOptions {
  directory?: string;
  threshold?: number;
  autoindex?: boolean;
  limit?: number;
}

export interface TokenizeOptions {
  follow?: boolean;
  allowList?: string[];
  insensitive?: boolean;
}
