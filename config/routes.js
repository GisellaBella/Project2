var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

router.route('/')
	.get(staticsController.home);

router.route('/users')
	.get(usersController.userList)
	.post(usersController.postSignup);
  // .post("https://us6.api.mailchimp.com/3.0/");

//API Endpoints
router.route('/api')//API info
	.get(usersController.apiIndex);

router.route('/api/user')
	.post(usersController.userCreate);//create a new user

router.route('/api/users')
	.get(usersController.userList);//User List

router.route('/api/user/:id') // Get, edit, delete a user by id
	.get(usersController.userShow)
	.put(usersController.userUpdate)
	.delete(usersController.userDelete);

module.exports = router;