exports = function({ fullDocument }) {
  const axios = require("axios");
  
  //for testing
  if(!fullDocument){
    fullDocument = {
      loc: "https://www.mongodb.com/docs/realm/sdk/java/quick-start-local/"  
    }
  }
  
  const pageUrl = fullDocument.loc;
  
  axios.get(pageUrl).then((res) => {
    const html = res.data;
    const titleRegex = /<title.*>(.*)<\/title>/;
    const pageTitleRes = titleRegex.exec(html);
    let title;
    if(pageTitleRes !== null){
      title = pageTitleRes[1];
    }
    const docText = html.replace(/<[^>]*>?/gm, '');

    // update search index collection
    const pageContents = context.services.get("mongodb-atlas").db("site-search").collection("page-contents");
    const query = { _id: pageUrl };
    const updateDoc = {
      $set: {
        title,
        doc_text: docText,
      },
      $currentDate: { last_updated: true }
    };
    const options = { upsert: true };
    pageContents.updateOne(query, updateDoc, options);
  });
};
