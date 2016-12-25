var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
// var env = require('../env');


router.route('/')
  .get(staticsController.home);

router.route('/users')
  .get(usersController.getSignup)
  .post(usersController.postSignup);



router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);


// router.route('/search')
//  .post(usersController.search);

module.exports = router;	