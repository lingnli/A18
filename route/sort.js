const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");
const { authenticated } = require("../config/auth.js");

router.get("/:id", authenticated, (req, res) => {
  console.log(req.params.id);
  let option = req.params.id;

  const category = {
    house: "家居物業",
    trans: "交通出行",
    leisure: "休閒娛樂",
    food: "餐飲食品",
    other: "其他"
  };

  Record.find(
    { category: category[option], userId: req.user._id },
    (err, records) => {
      if (err) return console.log(err);

      let totalAmount = 0;
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount;
      }

      res.render("index", { records, totalAmount, option: category[option] });
    }
  );
});

module.exports = router;

//日期排序未完成
