module.exports = function(req, res, next) {
  var Firebase = require("firebase");
  var ref = new Firebase(sails.config.globals.ref_firebase);
  var authData = ref.getAuth();
  if (authData) {
    sails.log("User " + authData.uid + " is logged in with " + authData.provider);
    return next();
  } else {
    sails.log("User is logged out");
    return res.redirect('/login');
  }
};
