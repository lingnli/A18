//account app 開啟時測試/預設資料
const mongoose = require("mongoose");
const Account = require("../record");

mongoose.connect("mongodb://localhost/record", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");

  //新增一個dummy data 測試存入Account Model是否正常
  Account.create({
    name: "午餐",
    date: "2019-04-20",
    category: "餐飲食品",
    amount: 60
  });

  console.log("done");
});
