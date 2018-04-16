var mongoose = require('mongoose');

var conversationSchema = mongoose.Schema({
		
		chatRoom : String,
		messages : [{
			sentBy : {
				type : mongoose.Schema.Types.ObjectId,
				ref : 'User',
			},
			message : String,
			sent_on : {type : Date, default : Date.now()}
		}],
		created : {type : Date, default : Date.now()} 
			
});

module.exports = mongoose.model('Conversations', conversationSchema);