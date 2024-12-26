const express = require('express');
const router = express.Router();
const path = require('path');
const home = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../templates/root.html'));
};

router.route('/').get(home);
router.route('/home').get(home);

module.exports = router;
