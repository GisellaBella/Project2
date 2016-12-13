// server.js
//Require apiKey

var env = require("./env.js");
var request = require("request");
var apiUrl ="http://api.wunderground.com/api/"+env.apiKey;


// var url = apiUrl + "/geolookup/q/"+zipcode+".json";
// request(url, function(err,res,body){
//   var location = JSON.parse(body).location.requesturl;
//   var url = apiUrl + "/conditions/q/"+location+".json";
//   request(url, function(err,res,body){
//     var observation = JSON.parse(body).current_observation
//     console.log("The weather in", observation.display_location.full, "is", observation.weather)
//   })
// })





// var env = require("./env.js");

// require express and other modules
// var express = require('express'),
// app = express();

// parse incoming urlencoded form data
// and populate the req.body object
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));
/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
// app.use(express.static('public'));

/*
 * HTML Endpoints
 */

// app.get('/', function homepage(request, response) {
//   response.sendFile(__dirname + '/views/index.html');
// });


   
// Pseudo code: need to collect the lat & log info on location request, via this link:
// http://maps.googleapis.com/maps/api/geocode/json?address=LOCATION&sensor=true&oe=utf-8
// then we need to populate that LOCATION Lat & Long information into the 
// initailize function. for example for Boulder it is  
// "location" : {"lat" : 40.0149856,"lng" : -105.2705456}

// var request;
// var sensor; //location



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});