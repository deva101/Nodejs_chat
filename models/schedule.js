var mongoose = require('mongoose');

var scheduleMsgSchema = mongoose.Schema({
		
		convId : {
				type : mongoose.Schema.Types.ObjectId,
				ref : 'Conversations',
			},
	
		sentBy : {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'User',
		},
		message : {type : String, require : true},
		sent_on : {type : Date, default : Date.now()},
		time : {type : Date}
		
			
});

module.exports = mongoose.model('ScheduleMsg', scheduleMsgSchema);