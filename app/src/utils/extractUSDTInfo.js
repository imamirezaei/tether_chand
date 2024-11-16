module.exports = function extractUSDTInfo(exchange, response) {
  let usdtInfo;
  if (exchange.symbolPath) {
    const dataArray = exchange.symbolPath
      .split(".")
      .reduce((obj, key) => obj && obj[key], response.data);
    usdtInfo = Array.isArray(dataArray)
      ? dataArray.find((item) => item.asset === "USDT")
      : dataArray;
  } else {
    usdtInfo = response.data;
  }

  if (exchange.name === "OK-EX" && usdtInfo.asset === "USDT") {
    return { buy_px: usdtInfo.buy_px, sell_px: usdtInfo.sell_px };
  } else if (exchange.name === "Aban-tether" && usdtInfo.coin === "USDT") {
    return { buy_px: usdtInfo.buy_price, sell_px: usdtInfo.sell_price };
  } else if (exchange.name === "Kifepool" && usdtInfo.symbol === "USDT") {
    return { buy_px: usdtInfo.buy, sell_px: usdtInfo.sell };
  }

  return usdtInfo;
};
