/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'clean': function(req, res) {
    var firebase = require ('firebase');
    var db = firebase.database();
		var refActiveUsers = db.ref("activeUsers/");
    var refTypingIndicator = db.ref("typingIndicator/");
    refActiveUsers.remove();
    refTypingIndicator.remove();
		return res.redirect('/');
	}
};
