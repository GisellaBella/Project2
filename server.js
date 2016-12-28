// server.js
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var request = require("request");


app = express();
app.use(morgan('dev')); 
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

/************
 * PARSING *
 ************/

// - deactivated du to unreselved error
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser()); 

/************
 * PASSPORT *
 ************/

app.use(session({ secret: 'WDI-GA-EXPRESS' }));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
require('./config/passport')(passport);
app.use(function (req, res, next) {
  	res.locals.currentUser = req.user;
	currentSessionUser = res.locals.currentUser;
	next();
});

/************
 * DATABASE *
 ************/
var db = require('./models');

/**********
 * ROUTES *
 **********/
// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
var routes = require('./config/routes');
app.use(routes);
app.use(express.static('public'));
app.use(express.static(__dirname + '/public')); 
app.set('views', './views');



/*
 * HTML Endpoints
 */
app.get('/', function homepage(request, response) {
  response.sendFile(__dirname + '/views/index.ejs');
});
app.get('/search_results', function search_results(request, response) {
  response.render(__dirname + '/views/search_results.ejs');
});
app.get('/contact_page', function contact_page(request, response) {
  response.render(__dirname + '/views/contact_page.ejs');
});

app.get('/original_wireframes', function original_wireframes(request, response) {
  response.render(__dirname + '/views/original_wireframes.ejs');
});

app.get('/readMe', function readMe(request, response) {
  response.render(__dirname + '/views/readMe.ejs');
});

app.get('/thanks', function thanks(request, response) {
  response.render(__dirname + '/views/thanks.ejs');
});

/**********
 * SERVER *
 **********/
// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});