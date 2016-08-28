/**
* Bootstrap
* (sails.config.bootstrap)
*
* An asynchronous bootstrap function that runs before your Sails app gets lifted.
* This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
*
* For more information on bootstrapping your app, check out:
* http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
*/

module.exports.bootstrap = function(cb) {

  var firebase = require("firebase");
  firebase.initializeApp({
    serviceAccount: sails.config.globals.path_service_amicale_config,
    databaseURL: sails.config.globals.ref_firebase
  });

  setInterval(function() {
    var db = firebase.database();
		var refActiveUsers = db.ref("activeUsers/");
    var refTypingIndicator = db.ref("typingIndicator/");
    refActiveUsers.remove();
    refTypingIndicator.remove();
    // Toutes les heures
  }, 1000*60*60);

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
