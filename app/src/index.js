require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ExchangeRate = require("./models/ExchangeRate");
const logger = require("./config/logger");
const { startFetchingData } = require("./controller/fetchDataController");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3001;

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = "tether_prices";

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
      const client = new MongoClient(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();

      const db = await client.db(dbName);
      const collections = await db.listCollections().toArray();


      const lastDocs = {};

        // Iterate over each collection
        for (const collectionInfo of collections) {
            const collectionName = collectionInfo.name;
            const collection = await db.collection(collectionName);

            // Find the last document sorted by _id in descending order
            const lastDoc = await collection.find().sort({ _id: -1 }).limit(1).toArray();

            // Store the last document in the result object if it exists
            if (lastDoc.length > 0) {
                lastDocs[collectionName] = lastDoc[0];
            } else {
                lastDocs[collectionName] = null; // or handle empty collection case as needed
            }
        }

        console.log(lastDocs);

      // const exchangeRates = await ExchangeRate.find();

      // const collections = mongoose.connection.collections;

      console.log(await collections);

      // Find Exir data
      // const exirData = exchangeRates.find((rate) => rate.name === "Exir");

      // Prepare data for rendering

      res.render("index", { lastDocs });
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
