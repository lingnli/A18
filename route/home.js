const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");
const { authenticated } = require("../config/auth.js");
const moment = require("moment");

//首頁
router.get("/", authenticated, async (req, res) => {
  console.log(req.user);
  //userId:record req.user._id:登入user
  let records = await Record.find({ userId: req.user._id });

  try {
    for (let i = 0; i < records.length; i++) {
      // console.log(moment(records[i].date).format("YYYY-MM-DD"));
      records[i].formatData = moment(records[i].date).format("YYYY-MM-DD");
    }
    // console.log(Object.keys(records[0]));
    // ->formatDate屬性不會印在terminal,需在Schema搭配設定
    //總計
    let totalAmount = 0;
    let chartData = [];
    let [house, trans, leisure, food, other] = [0, 0, 0, 0, 0];

    for (let i = 0; i < records.length; i++) {
      totalAmount += records[i].amount;
      //圖表統計
      switch (records[i].category) {
        case "家居物業":
          house += records[i].amount;
          break;
        case "交通出行":
          trans += records[i].amount;
          break;

        case "休閒娛樂":
          leisure += records[i].amount;
          break;

        case "餐飲食品":
          food += records[i].amount;
          break;

        case "其他":
          other += records[i].amount;
          break;
      }
    }

    chartData.push(house, trans, leisure, food, other);
    res.render("index", { records, totalAmount, chartData });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
