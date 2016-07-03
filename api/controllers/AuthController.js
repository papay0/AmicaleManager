/**
* AuthController
*
* @description :: Server-side logic for managing Auths
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

//var firebase = require("firebase");
//var ref = new Firebase(sails.config.globals.ref_firebase);

module.exports = {

	// .then(function (response) {
	// 	// session.user = firebase.auth().currentUser;
	// 	// defer.resolve(response);
	// 	sails.log("Authenticated successfully with payload:", authData);
	// 	res.cookie('userLoggedIn', '1', { maxAge: 900000, httpOnly: true });
	// 	return res.redirect('/post/new');
	// })

	login: function(req, res) {
		var firebase = require("firebase");
		var user = firebase.auth().currentUser;
		// firebase.initializeApp({
	  //   serviceAccount: sails.config.globals.path_service_amicale_config,
	  //   databaseURL: sails.config.globals.ref_firebase
	  // });
		email = req.param('email');
		password = req.param('password');
		sails.log("before auth()"+firebase.auth());
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
			sails.log("Login Failed!", errorMessage);
			res.cookie('userLoggedIn', '0', { maxAge: 900000, httpOnly: true });
			return res.send("Error authentication");
		});
		sails.log("after auth()");
	},

	logout: function(req, res) {
		return res.redirect('/');
	}

};
