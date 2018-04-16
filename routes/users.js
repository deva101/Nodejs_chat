var Conversation = require('../models/conversations');
var ScheduleMsg = require('../models/schedule');

module.exports = function(app, passport){

	app.get('/', function(req, res){
		res.redirect('/auth/login');
	});

	app.get('/chat', isLoggedIn, function(req, res){
		
		Conversation.find({}, function(err, conversations){
			var conversationsMap = {};

			conversations.forEach(function(conversation){
				conversationsMap[conversation._id] = conversation.chatRoom;
			});

			console.log(conversationsMap);

			res.render('home', {user : req.user, chatRoom : conversationsMap});
		});
	
	});

	app.post('/chat', isLoggedIn, function(req, res){
		var newConversation = new Conversation();
		newConversation.chatRoom = req.body.chatRoom;
		newConversation.save(function(err){
			if (err) {throw err;}
			else {res.redirect('/chat');}
		})
	});

	app.post('/message/s/', isLoggedIn, function(req, res){

		var newscheduleMsg = new ScheduleMsg();
		newscheduleMsg.convId = req.body.convId;
		newscheduleMsg.sentBy = req.body.user;
		newscheduleMsg.message = req.body.msg;
		
		var time = req.body.time;

		isodate = new Date();
		isodate.setTime(isodate.getTime() + time * 60 * 1000);
		console.log(isodate.getTime());
		console.log(isodate);

		newscheduleMsg.time = isodate;

		newscheduleMsg.save(function(err){
			if (err) {throw err;}
			else {res.send('Message schedule');}
		})
		
	});

	app.get('/chat/:convId', isLoggedIn, function(req,res){
		res.render('chat', {user : req.user, convId : req.params.convId});
	});

	
}

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		next();
	else res.redirect('/auth/login');

}
