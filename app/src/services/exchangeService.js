const mongoose = require("mongoose");
const ExchangeRate = require("../models/ExchangeRate");

async function saveExchangeRate(exchangeName, buyPrice, sellPrice) {
  const priceData = new ExchangeRate({
    exchangeName,
    buyPrice,
    sellPrice,
    updatedAt: new Date(),
  });

  await priceData.save();
}

module.exports = { saveExchangeRate };
