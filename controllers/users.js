
// // var passport = require("passport");
var db = require('../models');

// // // GET /signup
function getSignup(req, res) {
  db.User.find({},function(err, user){
          if (err) { 
            return console.log ("Got a userDB error: " + err);
          }
          res.json(user);
        });
    }


// POST /signup
function postSignup(req,res,next) {
console.log(req.body);
db.User.create(req.body, function(err, user) {
      if (err) {
      console.log('error', err);
      }
    console.log(user);
    res.json(user);
    
  });
}
//   daterange=req.body.daterange;
//   name=req.body.name;
//   email=req.body.email;
//   password= req.body.password;
//   tel=req.body.tel;
//   road=req.body.road;
//   mountain= req.body.mountain;
//   townie=req.body.townie;
//   available= req.body.available;
//   comment=req.body.comment;
//   storeIds=req.body.storeIds;

//     user.findOne({'username':username,'password':password},function(err,docs){
//         //do something
//     });


  // var newUser = new db.User(request.body);
  //  newUser.save(function (err, user){
  //         if (err) { 
  //           return console.log("user Inquiry error: " + err);
  //         } 
  //         response.json(user);
  //       });
    



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


// function search(request, response){
//  var search = request.body;
//  var fullURL= response.json("https://maps.googleapis.com/maps/api/place/textsearch/json?query=bikeshops+in"+ search + apiKey);
// }



// }

module.exports = {
  // search: search,
  // getLogin: getLogin,
  // postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  // getLogout: getLogout,
  // secret: secret,
};




