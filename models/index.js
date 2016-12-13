var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/express-personal-api");

var User = require("./user");


module.exports.User = require("./user.js");
