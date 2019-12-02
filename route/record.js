const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");

router.get("/", (req, res) => {
  res.redirect("/");
});
//新增頁面
router.get("/new", (req, res) => {
  res.render("new");
});
router.post("/new", (req, res) => {
  console.log(req.body);
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount
  });
  record.save(err => {
    if (err) return console.log(err);
    return res.redirect("/");
  });
});

//編輯頁面
router.get("/edit/:id", (req, res) => {
  console.log(req.params.id);
  Record.findById(req.params.id, (err, records) => {
    if (err) return console.log(err);
    res.render("edit", { records });
  });
});
router.put("/edit/:id", (req, res) => {
  Record.findById(req.params.id, (err, records) => {
    if (err) return console.log(err);
    records.name = req.body.name;
    records.category = req.body.category;
    records.date = req.body.date;
    records.amount = req.body.amount;
    records.save(err => {
      console.log(records);
      if (err) return console.log(err);
      res.redirect("/");
    });
  });
});

//刪除
router.delete("/delete/:id", (req, res) => {
  Record.findById(req.params.id, (err, records) => {
    if (err) return console.log(err);
    records.remove(err => {
      if (err) return console.log(err);
      res.redirect("/");
    });
  });
});

module.exports = router;
