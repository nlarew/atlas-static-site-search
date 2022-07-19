interface Results {
  title: string;
  doc_text: string;
  // see https://www.mongodb.com/docs/atlas/atlas-search/highlighting/#output
  highlights: {
    path: string;
    texts: Documents[];
    score: number;
  };
}

interface Documents {
  value: string;
  type: "hit" | "text";
}
