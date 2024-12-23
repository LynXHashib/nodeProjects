const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require(`path`);
const { json } = require("stream/consumers");
const app = express();

///////////////
app.use(express.json());

const PORT = 3000;

//////////////// FS ///////////

const order = fs.readFileSync("./entry.json", "utf-8");
const orderID = JSON.parse(order);
const quoteJson = JSON.parse(fs.readFileSync("./quote.json"), "utf-8");
const readTxt = fs.readFileSync("./randomText.txt", "utf-8");
const contactList = JSON.parse(fs.readFileSync("./contactList.json", "utf-8"));
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

const contactForm = (req, res) => {
  const newid = contactList.length;
  // const username = req.query.name.toLowerCase();
  // const password = parseFloat(req.query.pass);
  // const mail = req.query.mail;
  const { username, password, email } = req.body;

  const newJson = {
    id: `${newid}`,
    email: `${email}`,
    username: `${username}`,
    password: `${password}`,
  };
  contactList.push(newJson);
  console.log(newJson);
  if (!username || !password || isNaN(password) || !email) {
    res.status(404).send("Invalid parameters");
  }
  fs.writeFileSync("./contactList.json", JSON.stringify(contactList));
  res.status(201).json({
    task: "success",
    info: newJson,
  });
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

//////////////// GET ////////////////////

app.get(`/` || "home", home);
app.get(`/products`, product);
app.get(`/products/:id`, productID);
app.get("/joke", jokeApi);
app.get("/read", read);
app.get("/convert", convert);
app.get("/quote", quote);

///// POST ///////

app.post("/contact", contactForm);

///////////////////

app.listen(PORT, () => {
  console.log(`Server is Running`);
});
