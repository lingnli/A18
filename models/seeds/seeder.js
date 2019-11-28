//account app 開啟時測試/預設資料
const mongoose = require("mongoose");
const Account = require("../account");

mongoose.connect("mongodb://localhost/account", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");

  //測試存入Account Model是否正常
  Account.create({ name: "test" });

  console.log("done");
});
