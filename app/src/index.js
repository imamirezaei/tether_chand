require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("./config/logger");
const { startFetchingData } = require("./controller/fetchDataController");
const { MongoClient } = require("mongodb");

const app = express();

const mongoUrl = process.env.MONGO_URI;
const dbName = "tether_prices";

async function main() {
  logger.info("Starting TetherChand Service...");

  startFetchingData();

  try {
    console.log("=====================================")
    console.log(mongoUrl)
    await mongoose.connect(mongoUrl);
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
      const client = new MongoClient(mongoUrl);
      await client.connect();

      const db = client.db(dbName);
      const collections = await db.listCollections().toArray();

      const lastDocs = {};

      // Iterate over each collection
      for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;
        const collection = db.collection(collectionName);

        // Find the last document sorted by _id in descending order
        const lastDoc = await collection
          .find()
          .sort({ _id: -1 })
          .limit(1)
          .toArray();

        // Store the last document in the result object if it exists
        if (lastDoc.length > 0) {
          lastDocs[collectionName] = lastDoc[0]; // Store the last document
        } else {
          lastDocs[collectionName] = null; // Handle empty collection case
        }
      }

      res.render("index", { lastDocs }); // Pass the last documents to the view
    } catch (error) {
      logger.error("Error fetching exchange rates:", error);
      res.status(500).send("Error fetching data");
    }
  });

  app.listen(process.env.PORT, () => {
    logger.info(`Server is running on http://localhost:${process.env.PORT}`);
  });
}

main();
