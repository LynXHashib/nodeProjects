const express = require("express");
const contacts = require("./routes/contactRoute");
const app = express();
const home = require("./routes/homeRoute");
app.use("/", home);
app.use("/api/contacts", contacts);
module.exports = app;
