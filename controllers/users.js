var passport = require("passport");
var apiKey = "AIzaSyBBJ_3VrFAhw6K3qO-YbX4eMM-MAfLNQgc";

// GET /signup
function getSignup(request, response) {
	response.render('contact_page.html', { message: request.flash('signupMessage') });
}

// POST /signup
function postSignup(request, response) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/contact_page',
    failureFlash : true
  });

  return signupStrategy(request, response);
}



// GET /login
function getLogin(request, response) { 
	response.render('contact_page.html', { message: request.flash('loginMessage') });
}

// POST /login 
function postLogin(request, response) {
    var loginProperty = passport.authenticate('local-login', {
      successRedirect : '/thankyou',
      failureRedirect : '/contact_page',
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

// function search(request, response){
//  var search = request.body;
//  var fullURL= response.json("https://maps.googleapis.com/maps/api/place/textsearch/json?query=bikeshops+in"+ search + apiKey);
// }



// }

module.exports = {
  // search: search,
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret,
};




