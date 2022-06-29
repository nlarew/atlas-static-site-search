exports = function () {
  const sitemapURL = context.values.get("SITEMAP_URL");
  const axios = require("axios").default;
  const { XMLParser } = require("fast-xml-parser");
  const parser = new XMLParser();
  return axios.get(sitemapURL).then(({ data }) => {
    const sitemapObj = parser.parse(data);
    const urls = sitemapObj.urlset.url;
    const client = context.services.get("mongodb-atlas");
    const sitePages = client.db("site-search").collection("pages");
    const session = client.startSession();
    session.withTransaction(
      async () => {
        await sitePages.deleteMany({}, { session });
        await sitePages.insertMany(urls, { session });
      },
      {
        readPreference: "primary",
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
      }
    );
    return "successfully updated sitemap";
  });
};
