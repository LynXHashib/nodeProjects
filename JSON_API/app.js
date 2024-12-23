const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require(`path`);
const app = express();

///////////////

const PORT = 3000;
const order = fs.readFileSync("./entry.json", "utf-8");
const orderID = JSON.parse(order);
const quoteJson = JSON.parse(fs.readFileSync("./quote.json"), "utf-8");

//////////////// FS ///////////

const readTxt = fs.readFileSync("./randomText.txt", "utf-8");

// console.log(orderID[0]);
const home = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `templates`, `root.html`));
};
const product = (req, res) => {
  res.status(200).json({
    orderID,
  });
};
const productID = (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.status(200).json(orderID[id]);
};
const jokeApi = (req, res) => {
  https
    .get("https://official-joke-api.appspot.com/random_joke", (response) => {
      let data = "";

      // Collect data chunks
      response.on("data", (chunk) => {
        data += chunk;
      });

      // On end, parse and send the data
      response.on("end", () => {
        const joke = JSON.parse(data);
        res.json(joke);
      });
    })
    .on("error", (err) => {
      res.status(500).send("Error fetching joke");
    });
};
const read = (req, res) => {
  res.status(200).set("Content-Type", "text/plain").send(readTxt);
};
const convert = (req, res) => {
  const temp = parseFloat(req.query.temp);
  const unit = req.query.unit.toLowerCase();
  console.log(temp);
  console.log(unit);

  if (isNaN(temp) || !unit) {
    res.status(404).send("Provide Valid Temperature");
  }
  if (convertTemperature(unit, temp) === null) {
    res.status(404).send("Provide Valid Temperature");
  }
  console.log(convertTemperature(unit, temp));
  res.status(200).json({
    original: `${temp} ${unit === "c" ? "celsius" : "fahrenheit"}`,
    convert: `${convertTemperature(unit, temp).toFixed(2)} ${
      unit === "f" ? "celsius" : "fahrenheit"
    }`,
  });
};

const quote = (req, res) => {
  const randomID = Math.floor(Math.random() * quoteJson.length);
  res
    .status(200)
    .set("Cache-Control", "public, max-age=86400")
    .send(quoteJson[randomID]);
};
///////////////////////////

const convertTemperature = (unit, temp) => {
  if (unit === "c") {
    return (temp * 9) / 5 + 32;
  } else if (unit === "f") {
    return ((temp - 32) * 5) / 9;
  } else {
    return null;
  }
};

////////////////////////
// API'S

app.get(`/` || "home", home);
app.get(`/products`, product);
app.get(`/products/:id`, productID);
app.get("/joke", jokeApi);
app.get("/read", read);
app.get("/convert", convert);
app.get("/quote", quote);
///////////////////

app.listen(PORT, () => {
  console.log(`Server is Running`);
});
