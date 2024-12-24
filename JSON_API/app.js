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
const tasksList = JSON.parse(fs.readFileSync("./tasks.json", "utf-8"));
console.log(tasksList);

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

  if (!username || !password || isNaN(password) || !email) {
    return res.status(400).send("Invalid parameters");
  }
  const newJson = {
    id: `${newid}`,
    email: `${email}`,
    username: `${username}`,
    password: `${password}`,
  };
  contactList.push(newJson);
  console.log(newJson);
  fs.writeFileSync("./contactList.json", JSON.stringify(contactList, null, 2));
  res.status(201).json({
    task: "success",
    info: newJson,
  });
};

const taskManager = (req, res) => {
  const newID = tasksList.length;
  const { task } = req.body;
  if (!task) {
    return res.status(400).send("Invalid Task");
  }
  const newJson = {
    id: newID,
    task: `${task}`,
  };
  tasksList.push(newJson);
  fs.writeFileSync("./tasks.json", JSON.stringify(tasksList, null, 2));
  return res.status(201).json({
    Success: true,
    info: newJson,
  });
};
const deleteTask = (req, res) => {
  const { id } = req.body;
  tasksList.splice(id, 1);
  tasksList.forEach((task, index) => {
    task.id = index;
  });

  fs.writeFileSync("./tasks.json", JSON.stringify(tasksList, null, 2));
  res.status(200).send("Task deleted successfully");
  console.log(tasksList);
};
const editTask = (req, res) => {
  const { id, newTask } = req.body;
  if (id === null || !newTask) {
    return res.status(400).send("Invalid post");
  }
  if (id < 0 || id > tasksList.length) {
    return res.status(400).send("Invalid post");
  }
  tasksList[id].task = newTask;
  fs.writeFileSync("./tasks.json", JSON.stringify(tasksList, null, 2));
  res.status(200).json({ newTask });
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

app.get(`/` || "/home", home);
app.get(`/products`, product);
app.get(`/products/:id`, productID);
app.get("/joke", jokeApi);
app.get("/read", read);
app.get("/convert", convert);
app.get("/quote", quote);
app.get("/tasks", taskManager);

///// POST ///////

app.post("/contact", contactForm);
app.post("/tasks", taskManager);

///////////////////

app.delete("/tasks", deleteTask);

/////

app.patch("/tasks", editTask);

app.listen(PORT, () => {
  console.log(`Server is Running`);
});
