const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");

//login
router.get("/login", (req, res) => {
  res.render("login");
});
//實作登入邏輯前，需先完成session設定、passport設定，暫存登入功能
//從config/passport.js中載入設定的login驗證方法
const loginAuthLocal = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
});
router.post("/login", (req, res, next) => {
  loginAuthLocal(req, res, next);
});

//register
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  User.findOne({ email: email }).then(user => {
    if (user) {
      //email存在
      console.log("email already registered!");
      res.render("/register", { name, email });
    } else {
      const newUser = new User({ name, email, password });
      newUser
        .save()
        .then(user => {
          res.render("login"); //新增完成到登入頁面
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});
//logout
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/user/login");
});

module.exports = router;
