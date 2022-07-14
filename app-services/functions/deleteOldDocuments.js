// delete documents more than 12 hours old from the `page-contents` and `pages` collections
// so search results don't show pages that have been deleted

exports = function() { 
  const pageContents = context.services.get("mongodb-atlas").db("site-search").collection("page-contents");
  const pages = context.services.get("mongodb-atlas").db("site-search").collection("pages");
  
  var d = new Date();
  const twelveHoursAgo = new Date(d.setHours(d.getHours() - 12));
  const query = { last_updated : {"$lt" : twelveHoursAgo } };

  pageContents.deleteMany(query);
  pages.deleteMany(query);
};
