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
const home = (req, res) => {
  console.log(req.url);
  const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
  const output = homeTemp.replace("{%PRODUCT_CARDS%}", cardsHtml);
  res.status(200).send(output);
};

module.exports = home;
