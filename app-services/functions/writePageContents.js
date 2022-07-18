async function getDocsFromHtml(html){
  const html2textUrl = "https://ovxnui9i5h.execute-api.us-east-1.amazonaws.com/html2text"
  return await axios.post(html2textUrl, { html });
}

exports = async function({ fullDocument }) {
  const axios = require("axios");
  

  //for testing
  if(!fullDocument){
    fullDocument = {
      loc: "https://www.mongodb.com/docs/realm/sdk/flutter/realm-database/"  
    }
  }
  
  const pageUrl = fullDocument.loc;
  
  const { data: html } = await axios.get(pageUrl);
  const docText = getDocsFromHtml(html);
  
  const titleRegex = /<title.*>(.*)<\/title>/;
  const pageTitleRes = titleRegex.exec(html);
  let title;
  if(pageTitleRes !== null){
    title = pageTitleRes[1];
  }

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
};
