//account app 開啟時測試/預設資料
const mongoose = require("mongoose");
const Record = require("../record.js");
const User = require("../user.js");
//載入種子data
const userSample = require("./sample.json").results0[0];
const recordSample = require("./sample.json").results1;
const bcrypt = require("bcrypt");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/record", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
  const newUser = new User({
    name: userSample.name,
    email: userSample.email,
    password: userSample.password
  });
  console.log(recordSample.length);

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          for (let i = 0; i < recordSample.length; i++) {
            Record.create({
              name: recordSample[i].name,
              category: recordSample[i].category,
              date: recordSample[i].date,
              amount: recordSample[i].amount,
              userId: newUser._id
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  console.log(newUser);
  console.log("done");
});
