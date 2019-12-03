const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");
const { authenticated } = require("../config/auth.js");

//首頁
router.get("/", authenticated, (req, res) => {
  console.log(req.user);
  Record.find({ userId: req.user._id }, (err, records) => {
    if (err) return err;

    //總計
    let totalAmount = 0;
    for (let i = 0; i < records.length; i++) {
      totalAmount += records[i].amount;
    }
    res.render("index", { records, totalAmount });
  });
});

module.exports = router;
