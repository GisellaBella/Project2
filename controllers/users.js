var passport = require("passport");
// var apiGoogle = require('./env');

// GET /signup
function getSignup(request, response) {
	response.render('signup.ejs', { message: request.flash('signupMessage') });
}

// POST /signup
function postSignup(request, response) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signupStrategy(request, response);
}



// GET /login
function getLogin(request, response) { 
	response.render('login.ejs', { message: request.flash('loginMessage') });
}

// POST /login 
function postLogin(request, response) {
    var loginProperty = passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/login',
      failureFlash : true
    });

    return loginProperty(request, response);	
}

// GET /logout
function getLogout(request, response) {  
	request.logout();
  response.redirect('/');
}

// Restricted page
function secret(request, response){
  response.json({secret: "Woooah secret!"});
}

function getLocation(request, response){
  response.json("https://maps.googleapis.com/maps/api/place/textsearch/json?query=bikeshops+in+boulder&key=AIzaSyBBJ_3VrFAhw6K3qO-YbX4eMM-MAfLNQgc");

}

module.exports = {
  getLocation: getLocation,
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret,
};




