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
const Record = require("./models/record.js");

//route
app.get("/", (req, res) => {
  res.send("首頁：瀏覽所有資料");
});
app.get("/record", (req, res) => {
  res.redirect("/");
});
//新增頁面
app.get("/record/new", (req, res) => {
  res.send("新增一筆消費頁面");
});
app.post("/record/new", (req, res) => {
  res.send("新增頁面送出動作");
});
//編輯頁面
app.get("/record/edit", (req, res) => {
  res.send("編輯一筆消費頁面");
});
app.post("/record/edit", (req, res) => {
  res.send("編輯頁面送出動作");
});
//刪除
app.post("/record/delete", (req, res) => {
  res.send("刪除一筆資料動作");
});

app.listen(3000, () => {
  console.log("App is running!");
});
