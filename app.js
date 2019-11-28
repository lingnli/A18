const express = require("express");
const app = express();
const mongoose = require("mongoose");

//mongoose setting
mongoose.connect("mongodb://localhost/account", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//after mongoose connect
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

//透過mongoose連線database後載入Account Model
const Account = require("./models/account.js");

app.get("/", (req, res) => {
  res.send("this will be an account book app");
});

app.listen(3000, () => {
  console.log("App is running!");
});
