const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

//login
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {
  res.render("login");
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
  res.send("logout");
});

module.exports = router;
