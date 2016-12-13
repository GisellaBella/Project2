// server.js

var env = require("./env.js");
var request = require("request");
var express = require('express');
var flash = require('flash');
app = express();
var morgan = require ('morgan');
app.use(morgan('dev')); 
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

/************
 * PARSING *
 ************/
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// - deactivated du to unreselved error
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(bodyParser()); 

/************
 * PASSPORT *
 ************/

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
require('./config/passport')(passport);
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

/************
 * DATABASE *
 ************/
mongoose.connect('mongodb://localhost/local-authentication-with-passport'); 
var db = require('./models');

/**********
 * ROUTES *
 **********/
// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
var routes = require('./config/routes');
app.use(routes);
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public')); not sure which way works
app.set('views', './views');
/*
 * HTML Endpoints
 */
app.set('views', './views');

/**********
 * SERVER *
 **********/
// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});