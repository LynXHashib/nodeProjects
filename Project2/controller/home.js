const home = (req, res) => {
  res.status(200).sendFile(`${__dirname}/../public/home/app.html`);
};
module.exports = home;
