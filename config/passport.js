var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },

  function(accessToken, refreshToken, profile, cb) {
    console.log("profile", profile);
    User.findOne({ 'facebookId': profile.id }, function (err, user) {
      if (err) return cd(err);
      if (user) {
        return cb(null, user);
      } else {
        var newUser = new User({
          name: profile.displayName,
          email: profile.email,
          facebookId: profile.id

        });
        newUser.save(function(err){
          if (err) return cb(err);
          return cb(null, newUser);
        });
      }

    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    done(err, user);
  });
});
