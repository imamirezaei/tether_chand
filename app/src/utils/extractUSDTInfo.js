module.exports = function extractUSDTInfo(exchange, response) {
  let usdtInfo;

  // Extract data based on the symbolPath if it exists
  if (exchange.symbolPath) {
    const dataArray = exchange.symbolPath
      .split(".")
      .reduce((obj, key) => obj && obj[key], response.data);
    usdtInfo = Array.isArray(dataArray)
      ? dataArray.find(
          (item) =>
            item.asset === "USDT" ||
            item.coin === "USDT" ||
            item.symbol === "USDT"
        )
      : dataArray;
  } else {
    usdtInfo = response.data;
  }

  // Define a mapping for each exchange's specific extraction logic
  const exchangeMapping = {
    Wallex: () => {
      const symbolData = response.data?.result?.symbols?.USDTTMN; // Access the USDTTMN symbol data
      if (symbolData) {
        const stats = symbolData.stats; // Access the stats object
        return {
          buy_px: stats.bidPrice || null, // Map bidPrice to buy_px
          sell_px: stats.askPrice || null, // Map askPrice to sell_px
        };
      }
      console.error(
        "Wallex response does not contain symbol data:",
        response.data
      );
      return { buy_px: null, sell_px: null };
    },
    Exir: () => {
      // Map last to both buy_px and sell_px
      return {
        buy_px: response.data?.["usdt-irt"]?.last || null, // Map last to buy_px
        sell_px: response.data?.["usdt-irt"]?.last || null, // Map last to sell_px
      };
    },
    Kifepool: () => {
      const data = response.data[0]; // Assuming data is an array
      return {
        buy_px: data.priceBuyIRT || null, // Map priceBuyIRT to buy_px
        sell_px: data.priceSellIRT || null, // Map priceSellIRT to sell_px
      };
    },
    Nobitex: () => {
      const bids = response.data?.bids;
      const asks = response.data?.asks;
      return {
        buy_px: bids?.[0]?.[0] || null, // First bid price
        sell_px: asks?.[0]?.[0] || null, // First ask price
      };
    },
    Ramzinex: () => {
      return {
        buy_px: response.data?.data?.buy || null, // Map buy to buy_px
        sell_px: response.data?.data?.sell || null, // Map sell to sell_px
      };
    },
    Tetherland: () => {
      return {
        buy_px: response.data?.data?.currencies?.USDT?.price || null, // Map price to buy_px
        sell_px: response.data?.data?.currencies?.USDT?.price || null, // Map price to sell_px
      };
    },
    "OK-EX": () => {
      const ticker = response.data?.tickers?.find((t) => t.asset === "USDT"); // Find the ticker for USDT
      if (ticker) {
        return {
          buy_px: ticker.buy_px || null, // Map buy_px to buy_px
          sell_px: ticker.sell_px || null, // Map sell_px to sell_px
        };
      }
      console.error(
        "OK-EX response does not contain USDT ticker:",
        response.data
      );
      return { buy_px: null, sell_px: null };
    },
    // Add more exchanges here if needed
  };

  // Check if the exchange has a specific extraction function
  if (exchangeMapping[exchange.name]) {
    const result = exchangeMapping[exchange.name]();
    if (result) {
      return result; // Return the extracted data if found
    }
  }

  // If no specific extraction logic was found, return the raw usdtInfo
  return usdtInfo;
};
