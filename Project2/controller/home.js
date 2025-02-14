const path = require("path");
const fs = require("fs");

const data = fs.readFileSync(
  path.join(__dirname, "..", "database", "cards.json"),
  "utf-8"
);
const dataObj = JSON.parse(data);

const homeTemp = fs.readFileSync(
  path.join(__dirname, "..", "public", "home", "app.html"),
  "utf-8"
);
const tempCard = fs.readFileSync(
  path.join(__dirname, "..", "public", "templates", "tempOverview.html"),
  "utf-8"
);

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCTNAME%}/g, product.name);
  output = output.replace(/{%QUANTITY%}/g, product.amount);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  return output;
};

const home = (req, res) => {
  console.log(req.url);
  const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
  const output = homeTemp.replace("{%PRODUCT_CARDS%}", cardsHtml);
  res.status(200).send(output);
};

module.exports = home;
