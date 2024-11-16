const exchanges = require("../exchanges");
const { fetchAndSaveData } = require("../services/exchangeService");

function startFetchingData() {
  exchanges.forEach((exchange) => {
    setInterval(() => fetchAndSaveData(exchange), 30000);
  });
}

module.exports = { startFetchingData };
