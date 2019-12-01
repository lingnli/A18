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
    name: "買吸塵器",
    date: "2019-11-22",
    category: "家居物業",
    amount: 15600
  });

  console.log("done");
});
