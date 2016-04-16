
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
		var Parse = require('parse/node');
		Parse.initialize(sails.config.globals.Parse_Application_Id);
		Parse.javaScriptKey = sails.config.globals.Parse_Javascript_Key;
		Parse.masterKey = sails.config.globals.Parse_Master_Key;
		Parse._useMasterKey = true;
		Parse.serverURL = sails.config.globals.Parse_Server_URL;
		Parse.Cloud.run('sendPush', {title: text }).then(function(result) {
			sails.log("Je suis gagant");
		}, function(error) {
			sails.log("Je suis perdant, error = "+error.message);
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
