
var User = require('../models/user.js')
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){

	passport.serializeUser(function(user,done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id,done) {
		User.findById(id, function(err,user){
			done(err,user);
		});
	});

	// Local Passport Strategy for signup

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true,

	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.email' : email}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage' , 'The email already taken'));
				} else{
					
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password); 
					newUser.name.firstName = req.body.firstName;
					newUser.name.lastName = req.body.lastName;

					newUser.save(function(err){
						if (err) 
							throw err;
						else
							done(null, newUser);
					})
				}
			})
		});
	}

	));

	// Local Passport Strategy for login

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true,
	},
	function(req, email , password, done) {
		User.findOne({'local.email' : email}, function(err, user){
			
			if (err)
				return done(err);
			
			if (!user)
				return done(null, false, req.flash('loginMessage' , 'User does not exists'));
			
			if(!user.validatePassword(password))
				return done(null, false, req.flash('loginMessage', 'Please check your password'));

			req.session.login = 'local';
			return done(null, user);

		});
	}
	));

}