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
router.get("/register", (req, res) => {
  res.render("register");
});
//logout
router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;
