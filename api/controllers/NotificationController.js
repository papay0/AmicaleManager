/**
 * NotificationController
 *
 * @description :: Server-side logic for managing Notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'sendPush': function(req, res){
		var text = req;
		sails.log("text = "+text);
		var sys = require('sys')
		var exec = require('child_process').exec;
		var child;

		var cmd = "curl -X POST -H \"X-Parse-Application-Id: "+sails.config.globals.Parse_Application_Id+"\" -H \"X-Parse-Master-Key: "+sails.config.globals.Parse_Master_Key+"\" -H \"X-Parse-REST-API-Key: "+sails.config.globals.Parse_REST_API_Key+"\" -H \"Content-Type: application/json\" -d '{\"where\": {\"deviceType\": \"ios\"},\"data\": {\"alert\": \""+text+"\",\"sound\": \"cheering.caf\",\"badge\": \"Increment\"}}' https://parseapi.back4app.com/push"
		child = exec(cmd, function (error, stdout, stderr) {
			sys.print('stdout: ' + stdout);
			sys.print('stderr: ' + stderr);
			if (error !== null) {
				sails.log('exec error: ' + error);
			}
		});
	},

	'send': function(req, res){
		var text = req.param("text");
		sails.controllers.notification.sendPush(text);
		res.redirect('/post');
	},

	'new': function(req, res){
		res.view('notification/notification');
	}

};
