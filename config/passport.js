//使用passport-local來驗證login
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

module.exports = passport => {
  //local strategy
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, { message: "Email is not registered yet!" });
        }
        //輸入的password 資料庫中的user.password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "wrong email/password!" });
          }
        });
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
