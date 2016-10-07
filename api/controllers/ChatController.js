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
	},

  'checkMessagesWithTimestamp': function(req, res) {
    var firebase = require ('firebase');
    var db = firebase.database();
    var refMessages = db.ref("messages/");
    var last_timestamp = 0;
    refMessages.on('child_added', function(snapshot) {
      var current_timestamp = Date.now() / 1000;
      var message = snapshot.val();
      if (message.dateTimestamp > current_timestamp || message.dateTimestamp < last_timestamp) {
        sails.log("ici j'update mon timestamp avec la valeur: "+current_timestamp);
        sails.log("message.dateTimestamp > current_timestamp: "+message.dateTimestamp > current_timestamp);
        sails.log("message.dateTimestamp < last_timestamp: "+message.dateTimestamp < last_timestamp);
        var k = snapshot.key;
        refMessages.child(k).update({
          '/dateTimestamp': current_timestamp
        });
        last_timestamp = current_timestamp;
      } else {
        last_timestamp = message.dateTimestamp;
      }
    });
  }
};
