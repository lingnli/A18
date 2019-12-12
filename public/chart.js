//chart.js params
function chart(data) {
  let outputData = [];
  let [house, trans, leisure, food, other] = [0, 0, 0, 0, 0];

  for (let i = 0; i < data.length; i++) {
    //圖表統計
    switch (data[i].category) {
      case "家居物業":
        house += data[i].amount;
        break;
      case "交通出行":
        trans += data[i].amount;
        break;

      case "休閒娛樂":
        leisure += data[i].amount;
        break;

      case "餐飲食品":
        food += data[i].amount;
        break;

      case "其他":
        other += data[i].amount;
        break;
    }
  }

  outputData.push(house, trans, leisure, food, other);
  return outputData;
}

module.exports = chart;
