
// user.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new Schema ({
local: {
email: String,
password : String
},
  daterange: String,
  name: String,
  tel: String,
  road: String,
  mountain: String,
  townie: String,
  available: String,
  comment: String,
  storeIds: Array,

});

UserSchema.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};



module.exports = mongoose.model('User', UserSchema);

