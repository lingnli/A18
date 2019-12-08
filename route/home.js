const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");
const { authenticated } = require("../config/auth.js");

//首頁
router.get("/", authenticated, async (req, res) => {
  console.log(req.user);
  //userId:record req.user._id:登入user
  let records = await Record.find({ userId: req.user._id });

  try {
    for (let i = 0; i < records.length; i++) {
      records[i].formatData = records[i].date.toJSON().split("T")[0];
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
      if (records[i].category === "家居物業") {
        house += records[i].amount;
      } else if (records[i].category === "交通出行") {
        trans += records[i].amount;
      } else if (records[i].category === "休閒娛樂") {
        leisure += records[i].amount;
      } else if (records[i].category === "餐飲食品") {
        food += records[i].amount;
      } else if (records[i].category === "其他") {
        other += records[i].amount;
      }
    }
    chartData.push(house, trans, leisure, food, other);
    res.render("index", { records, totalAmount, chartData });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
