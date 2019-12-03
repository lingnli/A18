//使用passport-local來驗證login
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
//fb
const FacebookStrategy = require("passport-facebook");
require("dotenv").config();

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
  //facebook strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ["email", "displayName"]
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile._json); //fb的回傳值
        User.findOne({ email: profile._json.email }).then(user => {
          if (!user) {
            //fb只取得name email，需協助創密碼
            var passwordSample = Math.random()
              .toString(36)
              .slice(-8);
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(passwordSample, salt, (err, hash) => {
                if (err) throw err;
                const newUser = new User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                });
                newUser
                  .save()
                  .then(user => {
                    return done(null, user);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            });
          } else {
            //如果email存在
            return done(null, user, {
              message: "this facebook is already register!"
            });
          }
        });
      }
    )
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
