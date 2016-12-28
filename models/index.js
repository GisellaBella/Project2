var mongoose = require("mongoose");

var User = require("./user");
mongoose.connect( 
					// process.env.MONGODB_URI || 
     //              process.env.MONGOLAB_URI || 
     //              process.env.MONGOHQ_URL || 
                  "mongodb://localhost/bikeFinderApp");


module.exports.User = require("./user.js");
