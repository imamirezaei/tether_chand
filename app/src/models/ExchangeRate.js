const mongoose = require("mongoose");

const exchangeRateSchema = new mongoose.Schema({
  exchangeName: String,
  buy_px: Number,
  sell_px: Number,
  createdAt: { type: Date, default: Date.now } // Add a timestamp for sorting
});

const ExchangeRate = mongoose.model("ExchangeRate", exchangeRateSchema);

module.exports = ExchangeRate;
