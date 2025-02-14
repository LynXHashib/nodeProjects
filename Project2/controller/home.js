const path = require("path");

const home = (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "public", "home", "app.html"));
};

module.exports = home;
