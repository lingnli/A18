const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const bcrypt = require("bcrypt");

//login
router.get("/login", (req, res) => {
  res.render("login");
});
//實作登入功能前，需先完成session設定、passport設定，完成暫存登入功能
//從config/passport.js中載入設定的login驗證方法
const loginAuthLocal = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/user/login"
});
router.post("/login", (req, res, next) => {
  req.flash("login_error", "帳號或密碼錯誤，請確認已註冊");
  loginAuthLocal(req, res, next);
});

//register
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  //錯誤提示
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "所有欄位為必填！" });
  }
  if (password !== password2) {
    errors.push({ msg: "二次輸入帳密不相同" });
  }
  if (errors.length > 0) {
    res.render("register", { errors, name, email });
  } else {
    // let findUserByEmail = function (email) {
    //   return new Promise((resolve, reject) => {
    //     User.findOne({ email: email }, (err, user) => {
    //       if (err) {
    //         return reject(err);
    //       }
    //       resolve(user);
    //     });
    //   })
    // }
    // findUserByEmail(email).then(user => {
    // });

    User.findOne({ email: email }).then(user => {
      if (user) {
        //email存在
        errors.push({ msg: "帳號已註冊過" });
        res.render("register", { name, email, errors });
      } else {
        const newUser = new User({ name, email, password });
        //bcrypt處理password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return console.log(err);
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.redirect("/user/login"); //新增完成到登入頁面
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      }
    });
  }
});
//logout
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("logout_success", "你已經成功登出！");
  res.redirect("/user/login");
});

module.exports = router;
