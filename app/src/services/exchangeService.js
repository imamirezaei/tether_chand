const axios = require("axios");
const { MongoClient } = require("mongodb");
const extractUSDTInfo = require("../utils/extractUSDTInfo");

const mongoUrl = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = "tether_prices";

async function fetchAndSaveData(exchange) {
  try {
    const response = await axios.get(exchange.url, {
      headers: exchange.headers,
    });
    const usdtInfo = extractUSDTInfo(exchange, response);

    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(exchange.name);

    const priceData = {
      name: exchange.name,
      timestamp: new Date(),
      data: usdtInfo,
    };

    await collection.insertOne(priceData);

    await client.close();
  } catch (error) {
    console.error(
      `Error fetching data or saving to MongoDB for ${exchange.name}:`,
      error
    );
  }
}

module.exports = { fetchAndSaveData };
