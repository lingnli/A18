const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const helper = require("./handlebars-helper.js");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");

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

//method-override setting POST having ?_method=DELETE/UPDATE
app.use(methodOverride("_method"));

//route
//home route
app.use("/", require("./route/home.js"));
//record route
app.use("/record", require("./route/record.js"));
//sort route
app.use("/sort", require("./route/sort.js"));
//user route
app.use("/user", require("./route/user.js"));

app.listen(3000, () => {
  console.log("App is running!");
});
