const Handlebars = require("handlebars");
Handlebars.registerHelper("ifEquals", function(arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
}); //三元運算子(敘述)?(true輸出結果)：(false輸出結果ㄘ)
