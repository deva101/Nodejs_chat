// var express = require('express');
// var config  = require('../config/config');
// var router = express.Router();

/* models */

var user = require('../models/user');

module.exports = function (app, passport) {

	/* GET users listing. */
	
	
	app.get('/auth/login', isNotLoggedIn,
		function(req, res, next) {
			res.render('auth/login', { message : req.flash('loginMessage') } );
		}
	);


	app.post('/auth/login', isNotLoggedIn,
		function(req, res, next){
			if (req.body.email && req.body.password)
				next();
			else
				res.render('auth/login', { message : 'All fields are necessary' } );
		},
		passport.authenticate('local-login', {
			successRedirect : '/chat/',
			failureRedirect : '/auth/login/',
			failureFlash 	: true
		})
	);


	app.get('/auth/register', isNotLoggedIn,
		function(req, res, next) {		
			res.render('auth/register', { message : req.flash('signupMessage') });
		}
	);


	app.post('/register', isNotLoggedIn,
		function(req, res, next){
			if (req.body.firstName && req.body.lastName  && req.body.email && req.body.password) {
				if (req.body.terms)
					next();
				else
					res.render('auth/register', { message : 'Must Agree to terms and Conditions' });
			}else{
				res.render('auth/register', { message : 'All fields are mandatory' });
			}
		}, 
		passport.authenticate('local-signup', {
			successRedirect : '/chat/',
			failureRedirect : '/auth/register/',
			failureFlash 	: true
		})
	);


	app.get('/auth/logout', function(req, res){
		req.logout();
		res.redirect('/');
		req.session.login = null;
		console.log(req.session);
	});

}


function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		next();
	else{
		res.status(403);
		res.json('You must be logged in');	
	} 

}

function isNotLoggedIn(req, res, next) {
	if(!req.isAuthenticated())
		next();
	else{
		res.redirect('/chat');
	}

}