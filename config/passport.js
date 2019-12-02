//使用passport-local來驗證login
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = require("../models/user.js");

module.exports = passport => {
  //local strategy
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, { message: "Email is not registered yet!" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Wrong email/password!" });
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
