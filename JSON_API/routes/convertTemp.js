const router = require('express').Router();
const convert = require('./../controllers/temparatureController');
router.route('/convert').get(convert);
module.exports = router;
