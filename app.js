const express = require("express");
const app = express();
require("dotenv").config();
//安裝dotenv後需判別應用程式執行環境
if (process.env.NODE_ENV !== "production") {
  // 如果不是 production 模式
  require("dotenv").config(); // 使用 dotenv 讀取 .env 檔案
}

const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const helper = require("./handlebars-helper.js");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

//mongoose setting
mongoose.connect("mongodb://localhost/record", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
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

//method-override setting POST having ?_method=DELETE/UPDATE
app.use(methodOverride("_method"));

//express-session setting
app.use(
  session({
    secret: "expense tracker", // secret: 定義一組屬於你的字串做為私鑰
    resave: false,
    saveUninitialized: true
  })
);
//passport,session設定
app.use(passport.initialize()); //先初始化
app.use(passport.session()); //使用session

//設定完passport後載入local策略來驗證login POST
require("./config/passport")(passport);

//登入後傳回user document可以在view使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

//routes
//home route
app.use("/", require("./route/home.js"));
//record route
app.use("/record", require("./route/record.js"));
//sort route
app.use("/sort", require("./route/sort.js"));
//user route
app.use("/user", require("./route/user.js"));
//auth route
app.use("/auth", require("./route/auth.js"));

app.listen(3000, () => {
  console.log("App is running!");
});
