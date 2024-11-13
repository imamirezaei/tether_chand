function extractUSDTInfo(exchange, data) {
  let usdtInfo;
  if (exchange.symbolPath) {
      usdtInfo = exchange.symbolPath.split('.').reduce((obj, key) => obj && obj[key], data);
  } else {
      usdtInfo = data;
  }

  if (exchange.name === 'OK-EX' && usdtInfo?.asset === 'USDT') {
      return { buyPrice: usdtInfo.buy_px, sellPrice: usdtInfo.sell_px };
  } else if (exchange.name === 'Aban-tether' && usdtInfo.coin === 'USDT') {
      return { buyPrice: usdtInfo.buy_price, sellPrice: usdtInfo.sell_price };
  } else if (exchange.name === 'Kifepool' && usdtInfo.symbol === 'USDT') {
      return { buyPrice: usdtInfo.buy, sellPrice: usdtInfo.sell };
  }
  return null;
}

module.exports = { extractUSDTInfo };
