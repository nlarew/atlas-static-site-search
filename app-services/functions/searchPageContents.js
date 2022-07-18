async function searchAgg(collection, query, limit, skip) {
  const agg = [
    {
      $search: {
        index: "site_index",
        text: {
          query,
          path: {
            wildcard: "*",
          },
        },
      },
    },
    {
      $project: {
        title: 1,
        doc_text: 1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];
  const results = await collection.aggregate(agg);
  return results;
}
exports = async function (query, limit = 10, skip = 0) {
  // for testing purposes
  if (!query) {
    query = "flutter open close realm";
  }
  const pageContents = context.services
    .get("mongodb-atlas")
    .db("site-search")
    .collection("page-contents");
  const searchResults = await searchAgg(pageContents, query, limit, skip);
  return searchResults;
};

if (typeof module !== "undefined") {
  module.exports = { searchAgg };
}
