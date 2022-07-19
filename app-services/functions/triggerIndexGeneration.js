// regenerate index by updating all page documents
// causing index generation trigger to fire
exports = async function () {
  const client = context.services.get("mongodb-atlas");
  await client
    .db("site-search")
    .collection("pages")
    .updateMany({}, { $set: { last_updated: Date() } });
  return "ok";
};
