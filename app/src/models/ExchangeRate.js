const mongoose = require("mongoose");

const exchangeRateSchema = new mongoose.Schema({
  exchangeName: String,
  buyPrice: Number,
  sellPrice: Number,
  updatedAt: { type: Date, default: Date.now },
});

const ExchangeRate = mongoose.model("ExchangeRate", exchangeRateSchema);

module.exports = ExchangeRate;
