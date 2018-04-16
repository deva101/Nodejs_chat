var cron = require('node-cron');
require('./chat');
var ScheduleMsg = require('../models/schedule');
var Conversation = require('../models/conversations')

module.exports = function(app,io){

	cron.schedule('*/20 * * * * *', function(){
		ScheduleMsg.find({'time' : {'$lte' : new Date()}}, function(err, msgs){
			if (err) {throw err;}
			else {
				msgs.forEach(function(msg){
					Conversation.update({_id:msg.convId},{$push:{messages : {sentBy : msg.sentBy , message : msg.message}}}, function(err, conversation){
						if (err) {throw err;}
						else {
							console.log('Scheduled Messages updated ');

							// fire a socket event
							io.sockets.in(msg.convId).emit('new_message', {msg : msg.message, sender : msg.sentBy});
							ScheduleMsg.findByIdAndRemove(msg._id, function(err, msg){
								if (err) {throw err}
								else console.log('deleted');
							})	
						}
					});				
				});

			}
		})
	  console.log('running a task every 20 seconds');
	});
}