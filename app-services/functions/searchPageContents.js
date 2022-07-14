function buildSearchAgg(query) {
  return [
  {
    $search: {
      index: 'site_index',
      text: {
        query,
        path: {
          'wildcard': '*'
        }
      }
    }
  },
  {
    $limit: 10,
  },
  {
    $project: {
      title: 1,
      doc_text: 1
    }
  }
];
  // const agg = [
  //   {
  //     $search: {
  //       index: 'site_index',
  //       text: {
  //         query,
  //         path: ["doc_text", "title"],
  //       },
  //       highlight: {
  //         path: "doc_text",
  //       }
  //     },
  //   },
  //   {
  //     $limit: 5,
  //   },
  //   {
  //     $project: {
  //       title: 1,
  //       doc_text: 1,
  //       highlights: { $meta: "searchHighlights" } 
  //     },
  //   },
  // ];
  // return agg;
}
exports = async function(query){
  // for testing purposes
  if(!query){
    query = 'flutter open close realm'
  }
  const pageContents = context.services.get("mongodb-atlas").db("site-search").collection("page-contents");
  const aggPipeline = buildSearchAgg(query);
  const searchResults = await pageContents.aggregate(aggPipeline);
  return searchResults;
};