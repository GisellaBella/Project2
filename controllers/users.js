
var passport = require("passport");

 
//get Signup
function getSignup(request, response, next) {
  response.render('/signup.ejs', { 
    message: request.flash('signupMessage') });
  }

// POST /New User
function postSignup(req,res,next) { // /users
var signupStrategy = passport.authenticate('local-signup', {
successRedirect: '/',
failureRedirect: '/contact_page',
failureFlash: true
});
console.log (req);
return signupStrategy(req, res, next);
}

// GET /login
function getLogin(request, response, next) { 
  response.render('login.ejs', { message: request.flash('loginMessage') });
}

// POST /login 
function postLogin(request, response, next) {
    var loginProperty = passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/login',
      failureFlash : true
    });
    return loginProperty(request, response, next);  
}

// GET /logout
function getLogout(request, response, next) {  
  request.logout();
  response.redirect('/');
}
// Restricted page
function secret(request, response, next){
  response.json({secret: "Woooah secret!"});
}

function userCreate(req, res) { //users
  db.User.create(req.body, function(err, user) {
    if (err) return "user post error: " + err;
    res.json(user);
  });
}

function userList(req, res) { // /users
  db.User.find({},function(err, userList){
    if (err) return "Got a usersDB error: " + err;
    });
    res.json(userList);
}
    
// API Endpoints
function apiIndex(req, res) {// '/api'//everything
  res.json({
    message: "BikeFinder API Endpoints",
    endpoints: [
    {method: "GET", path: "/api", description: "index-here"},
    {method: "GET", path: "/api/users", description: " Get All Users"},
    {method: "POST", path: "/api/user", description: "Create a New User"},
    {method: "GET", path: "/api/user/:id", description: "Get User by ID"},
    {method: "PUT", path: "/api/user/:id", description: "Update User by ID"},
    {method: "DELETE", path: "/api/user/:id", description: "Delete User by ID"},
    ]
  });
}

function userShow(req, res) {//'/api/user/:id'
  db.User.findById(req.params.id, function(err, user) {
    if (err) return "user show error: " + err;
    res.json(user);
  });
}

function userUpdate(req, res) { //'/api/user/:id'
  db.User.findById(req.params.id, function(err, user) {
    if (err) return "user update error: " + err;
    if (req.params.id == user._id) {
      user.local.email = req.body.email;
      user.local.password = req.body.password;
      user.daterange = req.body.daterange;
      user.name = req.body.name;
      user.tel  = req.body.tel;
      user.storeIds = req.body.storeIds;
      user.save();
    }
    res.json(user); 
  });
}

function userDelete(req, res) {//'/api/user/:id'
  db.User.remove({'_id' : req.params.id}, function(err, user) {
    if (err) return "user delete error: " + err;
    res.json(user);
  });
}

module.exports = {

  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret,
  userCreate: userCreate,
  userList: userList,
  apiIndex: apiIndex,
  userShow: userShow,
  userUpdate:userUpdate,
  userDelete:userDelete
};


