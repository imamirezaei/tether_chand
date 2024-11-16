require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');  // Required for joining paths
const ExchangeRate = require('./models/ExchangeRate');
const logger = require('./config/logger');
const { startFetchingData } = require('./controller/fetchDataController');

const app = express();
const port = 3000;

async function main() {
    // Log that the service is starting
    logger.info('Starting TetherChand Service...');

    // Start fetching data
    startFetchingData();

    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017', { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        logger.info('Connected to MongoDB');
    } catch (err) {
        logger.error('MongoDB connection error:', err);
        return;
    }

    // Set the views directory
    app.set('views', path.join(__dirname, 'views'));  // Specify the correct path for the views

    // Set EJS as the view engine
    app.set('view engine', 'ejs');

    // Serve static files
    app.use(express.static('public'));

    // Routes
    app.get('/', async (req, res) => {
        try {
            // Fetch data from MongoDB
            const exchangeRates = await ExchangeRate.find();
            
            // Render the template and pass the data to the view
            res.render('index', { exchangeRates });
        } catch (error) {
            logger.error('Error fetching exchange rates:', error);
            res.status(500).send('Error fetching data');
        }
    });

    // Start the server
    app.listen(port, () => {
        logger.info(`Server is running on http://localhost:${port}`);
    });
}

// Call the main function to start everything
main();
