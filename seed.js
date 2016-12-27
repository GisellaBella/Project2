// simply run: `node seed.js` from the root of this project folder.
var mongoose = require("mongoose");
var db = require("./models");

var newUser = [ {
  daterange: '2017-01-01 - 2017-01-31',
  name: 'Gigi wawa',
  email: 'gisella@gmail.com',
  password: 'gbird',
  tel: '9174972050',
  road: 'road',
  mountain: 'mountain',
  townie: 'townie',
  available: 'available',
  comment: 'my message.',
  storeIds: '["ChIJMe7XadLta4cR5zejSUROEHg","ChIJyaNsgCnsa4cRLH_L8FAe05s","ChIJyR7wHNbta4cROZn-9c-UBKc"]' 
}
];

db.User. create(newUser, function(err, user){
      if (err) { return console.log(' user db err', err); }
      console.log(newUser.length + " user added");


    });


