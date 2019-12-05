const express = require("express");
const router = express.Router();
const Record = require("../models/record.js");
const { authenticated } = require("../config/auth.js");

//首頁
router.get("/", authenticated, (req, res) => {
  console.log(req.user);
  //userId:record req.user._id:登入user
  Record.find(
    {
      userId: req.user._id
    },
    (err, records) => {
      if (err) return err;

      for (let i = 0; i < records.length; i++) {
        records[i].formatData = records[i].date.toJSON().split("T")[0];
      }
      // console.log(Object.keys(records[0])); ->formatDate屬性不會印在terminal,需在Schema搭配設定

      //總計
      let totalAmount = 0;
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount;
      }
      res.render("index", { records, totalAmount });
    }
  );
});

module.exports = router;
