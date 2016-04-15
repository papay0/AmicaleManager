
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
  // result is 'Hello world!'
	sails.log("Je suis gagant");
}, function(error) {
	sails.log("Je suis perdant, error = "+error.message);
    // handle error
});

		// var espace_secure = function addslashes( str ) {
    // return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
		// }
		//
		// var fct2 = function escapeDoubleQuotes(str) {
		// 		return str.replace(/\\([\s\S])|(")/g,"\\$1$2"); // thanks @slevithan!
		// 	}
		//
		// var text = req;
		// sails.log("text = "+text);
		// var sys = require('sys')
		// var exec = require('child_process').exec;
		// var child;
		//
		// var cmd = "curl -X POST -H \"X-Parse-Application-Id: "+sails.config.globals.Parse_Application_Id+"\" -H \"X-Parse-Master-Key: "+sails.config.globals.Parse_Master_Key+"\" -H \"X-Parse-REST-API-Key: "+sails.config.globals.Parse_REST_API_Key+"\" -H \"Content-Type: application/json\" -d '{\"where\": {\"deviceType\": \"ios\"},\"data\": {\"alert\": \""+text+"\",\"sound\": \"cheering.caf\",\"badge\": \"Increment\"}}' https://parseapi.back4app.com/push"
		// child = exec(cmd, function (error, stdout, stderr) {
		// 	sys.print('stdout: ' + stdout);
		// 	sys.print('stderr: ' + stderr);
		// 	if (error !== null) {
		// 		sails.log('exec error: ' + error);
		// 	}
		// });
	},

	'send': function(req, res){
		var text = req.param("text");
		sails.controllers.notification.sendPush(text);
		res.redirect('/post');
	},

	'new': function(req, res){
		res.view('notification/notification');
	},

	'sendPushNode': function(req, res){
		// var http = require('http');
		//
		// var postData = JSON.stringify({
		// 	'where': { 'deviceType': 'ios' },
		// 	'data': {
		// 		'alert': 'Test',
		// 		'badge': 1,
		// 		'sound': 'default'
		// 	}
		// });
		//
		// var options = {
		// 	hostname: 'parseapi.back4app.com',
		// 	port: 80,
		// 	path: '/push',
		// 	method: 'POST',
		// 	headers: {
		// 		'X-Parse-Application-Id': 'yhx0fv10GQ9YNGZgfW23gC9oj0XqCIlKnn0ZdrFJ',
		// 		'X-Parse-Master-Key': 'd7jNHhwLnOn77LH4GcFcHMbsMeMQqkG5BXuoZEpj',
		// 		'X-Parse-REST-API-Key': 'NrQjxMmRjCtceNOmypCatIPAX0Kj0OIM9izR4l8S',
		// 		'Content-Type': 'application/json'
		// 	}
		//};

		// var req = http.request(options, (res) => {
		// 	console.log(`STATUS: ${res.statusCode}`);
		// 	console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		// 	res.setEncoding('utf8');
		// 	res.on('data', (chunk) => {
		// 		console.log(`BODY: ${chunk}`);
		// 	});
		// 	res.on('end', () => {
		// 		console.log('No more data in response.')
		// 	})
		// });
		//
		// req.on('error', (e) => {
		// 	console.log(`problem with request: ${e.message}`);
		// });
		//
		// // write data to request body
		// req.write(postData);
		// req.end();
	}

};
