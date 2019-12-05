//設定Account Model的account document存入資料
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  merchant: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true, //將userId設定成索引功能增加查詢資料效能
    required: true
  }
});

module.exports = mongoose.model("Record", recordSchema);
