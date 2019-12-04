const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");
const { authenticated } = require("../config/auth.js");

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
  record.save(err => {
    if (err) return console.log(err);
    return res.redirect("/");
  });
});

//編輯頁面
router.get("/edit/:id", authenticated, async (req, res) => {
  console.log(req.params.id);

  // Record.findOne(
  //   { _id: req.params.id, userId: req.user._id },
  //   (err, records) => {
  //     if (err) return console.log(err);
  //     //mongoDB中取出的date格式為Date()，是object，需進行轉換
  //     formatDate = records.date.toJSON().split("T")[0];
  //     console.log(formatDate); //轉換日期
  //     res.render("edit", { records, formatDate });
  //   }
  // );

  let records = await Record.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  //mongoDB中取出的date格式為Date()，是object，需進行轉換
  formatDate = records.date.toJSON().split("T")[0];
  console.log(formatDate); //轉換日期
  res.render("edit", { records, formatDate });
});
router.put("/edit/:id", authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, records) => {
      if (err) return console.log(err);
      records.name = req.body.name;
      records.category = req.body.category;
      records.date = req.body.date;
      records.merchant = req.body.merchant;
      records.amount = req.body.amount;
      records.save(err => {
        console.log(records);
        if (err) return console.log(err);
        res.redirect("/");
      });
    }
  );
});

//刪除
router.delete("/delete/:id", authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, records) => {
      if (err) return console.log(err);
      records.remove(err => {
        if (err) return console.log(err);
        res.redirect("/");
      });
    }
  );
});

module.exports = router;
