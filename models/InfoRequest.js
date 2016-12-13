// infoRequest.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InfoRequestSchema = new Schema ({
  user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
         },
  name: String,
  dates: String,
  bikes: String,
  tel: String,
});

var InfoRequest = mongoose.model('InfoRequest', InforRequestSchema);

User.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', User);

