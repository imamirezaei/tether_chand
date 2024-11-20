const express = require('express'); // Require Express
const { MongoClient } = require('mongodb'); // Require MongoDB client

const app = express(); // Create an instance of Express
app.set('view engine', 'ejs'); // Set EJS as the templating engine

// MongoDB connection URI
const uri = 'mongodb://localhost:27017'; // Update with your MongoDB URI
const dbName = 'tether_prices'; // Replace with your database name
let db;

// Connect to MongoDB
MongoClient.connect(uri)
    .then(client => {
        console.log('Connected to Database');
        db = client.db(dbName);
    })
    .catch(error => console.error(error));

// Function to get the last record from the ExchangeRate collection
async function getLastExchangeRates() {
    const exchangeRates = await db.collection('ExchangeRate')
        .find()
        .sort({ createdAt: -1 })
        .limit(1)
        .toArray(); // Convert cursor to array
    return exchangeRates;
}

// Define the route
app.get('/', async (req, res) => {
    try {
        const exchangeRates = await getLastExchangeRates(); // Fetch the last records
        console.log(exchangeRates); // Log the fetched data

        // Check if exchangeRates is empty
        if (exchangeRates.length === 0) {
            return res.render('index', { exchangeRates: [] }); // Pass an empty array to avoid errors
        }

        res.render('index', { exchangeRates }); // Pass the data to the EJS template
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});