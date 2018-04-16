var mongoose = require('mongoose');
var bcrypt 	 = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
		
		name 			: {
			firstName 		: {type: String, default: null},
			lastName		: {type: String, default: null},
		},
		 
		local 			: {
			email 			: String,
			password 		: String,
			emailActivated 	: {type: Boolean, default: false}, 
		},
		created: {type: Date , default: Date.now},
			
});

userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validatePassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);