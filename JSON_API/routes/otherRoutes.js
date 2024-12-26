const router = require('express').Router();
const otherRoutes = require('../controllers/others'); // Added import statement
router.route('/joke').get(otherRoutes.jokeApi);
router.route('/contact').post(otherRoutes.contactForm);

module.exports = router;
