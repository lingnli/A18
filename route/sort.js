const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");
const { authenticated } = require("../config/auth.js");

router.get("/", authenticated, (req, res) => {
  let queryCategory = req.query.queryCategory || "";
  let queryMonth = req.query.queryMonth || "";

  const category = {
    house: "家居物業",
    trans: "交通出行",
    leisure: "休閒娛樂",
    food: "餐飲食品",
    other: "其他"
  };

  //Record搜尋資料邏輯判斷
  let searchString = {};

  if (
    (queryCategory !== "" && queryCategory !== "all" && queryMonth === "") ||
    (queryCategory !== "" && queryCategory !== "all" && queryMonth === "all")
  ) {
    //只選類別，不選月份===特定類別月份all
    searchString.category = category[queryCategory];
    searchString.userId = req.user._id;
  } else if (
    (queryMonth !== "" && queryMonth !== "all" && queryCategory === "") ||
    (queryMonth !== "" && queryMonth !== "all" && queryCategory === "all")
  ) {
    //只選月份，不選類別===特定月份類別all
    // console.log(queryMonth);
    searchString.date = {
      $gte: `2019-${queryMonth}-01`,
      $lte: `2019-${queryMonth}-31`
    };
    searchString.userId = req.user._id;
  } else if (
    queryCategory !== "" &&
    queryCategory !== "all" &&
    queryMonth !== "" &&
    queryMonth !== "all"
  ) {
    searchString.category = category[queryCategory];
    searchString.date = {
      $gte: `2019-${queryMonth}-01`,
      $lte: `2019-${queryMonth}-31`
      //＄增加年份選擇功能-未完成
    };
    searchString.userId = req.user._id;
  } else if (queryCategory === "all" && queryMonth === "all") {
    searchString.userId = req.user._id;
    queryMonth == "全部月份";
  }

  Record.find(searchString, (err, records) => {
    if (err) return console.log(err);
    console.log(records);

    for (let i = 0; i < records.length; i++) {
      records[i].formatData = records[i].date.toJSON().split("T")[0];
    }

    let totalAmount = 0;
    for (let i = 0; i < records.length; i++) {
      totalAmount += records[i].amount;
    }

    res.render("index", {
      records,
      totalAmount,
      category: category[queryCategory], //保存顯示
      queryCategory, //url用
      queryMonth
    });
  });
});

module.exports = router;
