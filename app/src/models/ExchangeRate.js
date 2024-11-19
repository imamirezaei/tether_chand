const mongoose = require("mongoose");

const exchangeRateSchema = new mongoose.Schema({
  exchangeName: String,
  updatedAt: { type: Date, default: Date.now },
});

const ExchangeRate = mongoose.model("ExchangeRate", exchangeRateSchema);

module.exports = ExchangeRate;
