require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ExchangeRate = require("./models/ExchangeRate");
const logger = require("./config/logger");
const { startFetchingData } = require("./controller/fetchDataController");

const app = express();
const port = 3000;

async function main() {
  logger.info("Starting TetherChand Service...");

  startFetchingData();

  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/tetherchand",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error("MongoDB connection error:", err);
    return;
  }

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");
  app.use(express.static("public"));

  app.get("/", async (req, res) => {
    try {
      const exchangeRates = await ExchangeRate.find();

      // Find Exir data
      const exirData = exchangeRates.find(rate => rate.name === "Exir");

      // Prepare data for rendering
      const exirSellPrice = exirData ? exirData.data.low : null; // Fetching the low price for sell price
      const exirBuyPrice = exirData ? exirData.data.last : null; // Fetching the last price for buy price

      res.render("index", { exchangeRates, exirSellPrice, exirBuyPrice });
    } catch (error) {
      logger.error("Error fetching exchange rates:", error);
      res.status(500).send("Error fetching data");
    }
  });

  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  });
}

main();