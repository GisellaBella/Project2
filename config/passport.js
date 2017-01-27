var LocalStrategy = require('passport-local').Strategy;

// var User = require('../models/user');

db = require ('../models');

module.exports = function(passport) {

passport.serializeUser(function(user,callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback){
    db.User.findById(id, function(err, user) {
      callback(err, user);
    });
  });
  
   passport.use('local-signup', new LocalStrategy({ //Here we are declaring the strategy for the signup - the first argument given to LocalStrategy is an object giving info about the fields we will use for the authentication.
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback : true
    
    }, function(req, email, password, callback) { //Now, inside this callback method, we will implement our custom logic to signup a user.
    // Find a user with this e-mail
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return callback(err);

      // If there already is a user with this email
      if (user) {
    return callback(null, false, req.flash('signupMessage', 'This email is already used.'));//callback method with the two arguments null and false - the first argument indicates no server error happened; the second one corresponds to a new user object, which in this case hasn't been created, so we return false.
      } else {
      // There is no user registered with this email
    // Create a new user
    var newUser            = new User();
    newUser.local.email    = email;
    newUser.local.password = newUser.encrypt(password);
    newUser.local.daterange = daterange;
    newUser.name = name;
    newUser.tel = tel;
    newUser.storeIds = storeIds; 
    road = road; 
    mountain = mountain; 
    townie = townie; 
    available = available; 
    comment = comment;


    newUser.save(function(err) {
      if (err) throw err;
      return callback(null, newUser);
    });
    
      }
    });
  }));
passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    // Search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return callback(err);
      }

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return callback(null, user);
    });
  }));
};
