const express = require("express");
const home = require("./routes/home");
const app = express();
const otherRouter = require("./routes/otherRoutes");
const taskRouter = require("./routes/taskMangerRoutes");
const convertTemp = require("./routes/convertTemp");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
// app.use(express.static('templates'));
// API'S
app.use("/", home);
app.use("/", otherRouter);
app.use("/api/v1", taskRouter);
app.use("/api/v2", convertTemp);

module.exports = app;
