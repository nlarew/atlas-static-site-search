// the searchPageContents function returns a Results[]
export interface Result {
  _id: string,
  title: string;
  doc_text: string;
  // see https://www.mongodb.com/docs/atlas/atlas-search/highlighting/#output
  highlights?: Array<Highlight>
}

export interface Highlight {
  path: string;
  texts: Documents[];
  score: number;
}

export interface Documents {
  value: string;
  type: "hit" | "text";
}
