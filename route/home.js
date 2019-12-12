const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");
const { authenticated } = require("../config/auth.js");
const moment = require("moment");
const chart = require("../public/chart");

//首頁
router.get("/", authenticated, async (req, res) => {
  console.log(req.user);
  //userId:record req.user._id:登入user
  let records = await Record.find({ userId: req.user._id });

  try {
    for (let i = 0; i < records.length; i++) {
      //date format
      records[i].formatData = moment(records[i].date).format("YYYY-MM-DD");
    }
    // console.log(Object.keys(records[0]));
    // ->formatDate屬性不會印在terminal,需在Schema搭配設定
    //總計
    let totalAmount = 0;

    for (let i = 0; i < records.length; i++) {
      totalAmount += records[i].amount;
    }
    let chartData = chart(records);
    res.render("index", { records, totalAmount, chartData });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
