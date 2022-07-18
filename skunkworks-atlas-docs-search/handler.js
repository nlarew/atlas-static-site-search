"use strict";

module.exports.html2text = async (event) => {
  const { html } = JSON.parse(event.body)
  
  const { convert } = require("html-to-text");
  const text = convert(html, {
    wordwrap: false,
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        text,
      },
      null,
      2
    ),
  }
}
