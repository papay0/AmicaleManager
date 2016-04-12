/**
* AuthController
*
* @description :: Server-side logic for managing Auths
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

var Firebase = require("firebase");
var ref = new Firebase(sails.config.globals.ref_firebase);

module.exports = {

	login: function(req, res) {
		ref.authWithPassword({
			email    : req.param('email'),
			password : req.param('password')
		}, function(error, authData) {
			if (error) {
				sails.log("Login Failed!", error);
				res.cookie('userLoggedIn', '0', { maxAge: 900000, httpOnly: true });
				return res.send("Error authentication");
			} else {
				sails.log("Authenticated successfully with payload:", authData);
				res.cookie('userLoggedIn', '1', { maxAge: 900000, httpOnly: true });
				return res.redirect('/post/new');
			}
		});
	},

	logout: function(req, res) {
		res.clearCookie('userLoggedIn');
		return res.redirect('/');
	}

};
