const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  let option = req.params.id;

  const category = {
    house: "家居物業",
    trans: "交通出行",
    leisure: "休閒娛樂",
    food: "餐飲食品",
    other: "其他"
  };

  Record.find({ category: category[option] }, (err, records) => {
    if (err) return console.log(err);

    let totalAmount = 0;
    for (let i = 0; i < records.length; i++) {
      totalAmount += records[i].amount;
    }

    res.render("index", { records, totalAmount });
  });
});

module.exports = router;

//日期排序未完成
