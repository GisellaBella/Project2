
// // var passport = require("passport");


// // // GET /signup
// // function getSignup(request, response) {
// // 	response.render('signup.ejs', { message: request.flash('signupMessage') });
// // }

// POST /signup
function postSignup(request, response) {
alert ("mafe it to postSignup");
console.log(request.body);
  var newUser = new db.User(request.body);
   newUser.save(function (err, user){
          if (err) { 
            return console.log("user Inquiry error: " + err);
          } 
          response.json(user);
        });
    



// // GET /login
// function getLogin(request, response) { 
// 	response.render('login.ejs', { message: request.flash('loginMessage') });
// }

// // POST /login 
// function postLogin(request, response) {
//     var loginProperty = passport.authenticate('local-login', {
//       successRedirect : '/',
//       failureRedirect : '/login',
//       failureFlash : true
//     });

//     return loginProperty(request, response);	
// }

// // GET /logout
// function getLogout(request, response) {  
// 	request.logout();
//   response.redirect('/');
// }

// // Restricted page
// function secret(request, response){
//   response.json({secret: "Woooah secret!"});
}

// function search(request, response){
//  var search = request.body;
//  var fullURL= response.json("https://maps.googleapis.com/maps/api/place/textsearch/json?query=bikeshops+in"+ search + apiKey);
// }



// }

module.exports = {
  // search: search,
  // getLogin: getLogin,
  // postLogin: postLogin ,
  // getSignup: getSignup,
  postSignup: postSignup,
  // getLogout: getLogout,
  // secret: secret,
};




