module.exports = [
  {
    name: "Wallex",
    url: "https://api.wallex.ir/v1/markets",
    headers: { "X-API-Key": process.env.WALLEX_API_KEY },
    symbolPath: "result.symbols.USDTTMN",
    buyPath: "result.symbols.USDTTMN.askPrice",
    sellPath: "result.symbols.USDTTMN.bidPrice",
  },
  {
    name: "Nobitex",
    url: "https://api.nobitex.ir/v3/orderbook/USDTIRT",
    headers: {
      Authorization: `Bearer ${process.env.NOBITEX_TOKEN}`,
      SYMBOL: "USDTIRT",
    },
    symbolPath: null,
    buyPath: "asks[0][0]",
    sellPath: "bids[0][0]",
  },
  {
    name: "Exir",
    url: "https://api.exir.io/v2/tickers",
    headers: {},
    symbolPath: "usdt-irt",
    buyPath: "usdt-irt.last",
    sellPath: "usdt-irt.last",
  },
  {
    name: "Ramzinex",
    url: "https://publicapi.ramzinex.com/exchange/api/v1.0/exchange/pairs/11",
    headers: {},
    symbolPath: null,
    buyPath: "data.buy",
    sellPath: "data.buy",
  },
  {
    name: "Tetherland",
    url: "https://api.tetherland.com/currencies",
    headers: { Accept: "application/json" },
    symbolPath: null,
    buyPath: "data.currencies.USDT.price",
    sellPath: "data.currencies.USDT.price",
  },
  // {
  //   name: "OK-EX",
  //   url: "https://azapi.ok-ex.io/oapi/v1/otc/tickers",
  //   headers: {},
  //   symbolPath: "tickers",
  //   buyPath: "tickers.buy_price",
  //   sellPath: "tickers.sell_price",
  // },
  // {
  //   name: "Aban-tether",
  //   url: "https://abantether.com/api/v1/otc/coin-price/?coin=usdt",
  //   headers: {
  //     Authorization: `Bearer ${process.env.ABAN_TOKEN}`,
  //   },
  //   symbolPath: null,
  //   buyPath: "USDT.irtPriceBuy",
  //   sellPath: "USDT.irtPriceSell",
  // },
  {
    name: "Kifepool",
    url: "https://api.kifpool.app/api/spot/price?symbol=USDT",
    headers: {},
    symbolPath: null,
    buyPath: "data.buy_price",
    sellPath: "data.sell_price",
  },
];
