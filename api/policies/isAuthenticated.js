module.exports = function(req, res, next) {
  if (req.cookies.userLoggedIn == '1') {
    sails.log("USER CONNECTED")
    return next();
  } else {
    sails.log("USER NOT CONNECTED")
    return res.redirect('/login');
  }
};
