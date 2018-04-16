var Conversation = require('../models/conversations');
module.exports = function(app, io){
	

	io.sockets.on('connection', function(socket){

		socket.on('join', function (data) {
			console.log(data);
		    socket.join(data); // We are using room of socket io
		  });


		socket.on('send_message', function(data){
			
			Conversation.findById(data.convId, function(err, conversation){
				if (err) {throw err;}
				else if (conversation) {

					Conversation.update({_id:conversation._id},{$push:{messages : {sentBy : data.user , message : data.msg}}}, function(err, conversation){
						if (err) {throw err;}
						else {
							io.sockets.in(data.convId).emit('new_message', {msg : data.msg, sender : data.user})
						}
						console.log(conversation);
					});

				}
			})			
		});

	});


}