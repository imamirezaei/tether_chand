const exchanges = require("../exchanges");
const { fetchAndSaveData } = require("../services/exchangeService");

function startFetchingData() {
  exchanges.forEach((exchange) => {
    setInterval(() => fetchAndSaveData(exchange), 10000);
  });
}

module.exports = { startFetchingData };
