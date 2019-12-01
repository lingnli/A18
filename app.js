const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const helper = require("./handlebars-helper.js");
const bodyParser = require("body-parser");

//mongoose setting
mongoose.connect("mongodb://localhost/record", {
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

//handlebars setting
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//static file setting
app.use(express.static("public"));

//body-parser setting
app.use(bodyParser.urlencoded({ extended: true }));

//route
//首頁
app.get("/", (req, res) => {
  Record.find((err, records) => {
    if (err) return err;

    //總計
    let totalAmount = 0;
    for (let i = 0; i < records.length; i++) {
      totalAmount += records[i].amount;
    }
    res.render("index", { records, totalAmount });
  });
});
app.get("/record", (req, res) => {
  res.redirect("/");
});

//新增頁面
app.get("/record/new", (req, res) => {
  res.render("new");
});
app.post("/record/new", (req, res) => {
  console.log(req.body);
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount
  });
  record.save(err => {
    if (err) return console.log(err);
    return res.redirect("/");
  });
});

//編輯頁面
app.get("/record/edit/:id", (req, res) => {
  console.log(req.params.id);
  Record.findById(req.params.id, (err, records) => {
    if (err) return console.log(err);
    res.render("edit", { records });
  });
});
app.post("/record/edit/:id", (req, res) => {
  Record.findById(req.params.id, (err, records) => {
    if (err) return console.log(err);
    records.save(err => {
      if (err) return console.log(err);
      res.redirect("/");
    });
  });
});

//刪除
app.post("/record/delete", (req, res) => {
  res.send("刪除一筆資料動作");
});

app.listen(3000, () => {
  console.log("App is running!");
});
