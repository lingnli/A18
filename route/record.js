const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");
const { authenticated } = require("../config/auth.js");
const moment = require("moment");

router.get("/", authenticated, (req, res) => {
  res.redirect("/");
});
//新增頁面
router.get("/new", authenticated, (req, res) => {
  res.render("new");
});
router.post("/new", authenticated, (req, res) => {
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    merchant: req.body.merchant,
    userId: req.user._id
  });
  if (record.category === "") {
    console.log(record);
    formatDate = moment(record.date).format("YYYY-MM-DD");
    let new_error = true;
    res.render("new", {
      record,
      formatDate,
      new_error
    });
  } else {
    record.save(err => {
      err ? console.log(err) : res.redirect("/");
    });
  }
});

//編輯頁面
router.get("/edit/:id", authenticated, async (req, res) => {
  console.log(req.params.id);
  let records = await Record.findOne({
    _id: req.params.id,
    userId: req.user._id
  });
  //mongoDB中取出的date格式為Date()，是object，需進行轉換
  formatDate = moment(record.date).format("YYYY-MM-DD");
  console.log(formatDate); //轉換日期
  res.render("edit", { records, formatDate });
});
router.put("/edit/:id", authenticated, async (req, res) => {
  try {
    let record = await Record.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    record.name = req.body.name;
    record.category = req.body.category;
    record.date = req.body.date;
    record.merchant = req.body.merchant;
    record.amount = req.body.amount;
    record.save(err => {
      err ? console.log(err) : res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
});

//刪除
router.delete("/delete/:id", authenticated, async (req, res) => {
  try {
    let record = await Record.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    record.remove(err => {
      err ? console.log(err) : res.redirect("/");
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
