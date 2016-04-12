/**
* AuthController
*
* @description :: Server-side logic for managing Auths
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {

	login: function(req, res) {
		var ref = new Firebase(sails.config.globals.ref_firebase);
		ref.authWithPassword({
			email    : "bobtony@firebase.com",
			password : "correcthorsebatterystaple"
		}, function(error, authData) {
			if (error) {
				sails.log("Login Failed!", error);
				return res.send("Error authentication");
			} else {
				sails.log("Authenticated successfully with payload:", authData);
				return res.redirect('/post/new');
			}
		});
	},

};
