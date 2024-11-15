const axios = require("axios");
const { saveExchangeRate } = require("../services/exchangeService");
const { extractUSDTInfo } = require("../utils/extractUSDTInfo");
const logger = require("../config/logger");

async function fetchDataAndStoreInDB(exchange) {
  try {
    const response = await axios.get(exchange.url, {
      headers: exchange.headers,
    });
    const usdtInfo = extractUSDTInfo(exchange, response.data);

    if (usdtInfo) {
      await saveExchangeRate(
        exchange.name,
        usdtInfo.buyPrice,
        usdtInfo.sellPrice
      );
      logger.info(`Data saved for ${exchange.name}`);
    }
  } catch (error) {
    logger.error(`Error fetching data for ${exchange.name}: ${error.message}`);
  }
}

module.exports = { fetchDataAndStoreInDB };
