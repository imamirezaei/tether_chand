const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.set('view engine', 'ejs');

const uri = 'mongodb://localhost:27017';
const dbName = 'tether_prices';
let db;

MongoClient.connect(uri)
    .then(client => {
        console.log('Connected to Database');
        db = client.db(dbName);
    })
    .catch(error => console.error(error));

async function getLastExchangeRates() {
    const exchangeRates = await db.collection('ExchangeRate')
        .find()
        .sort({ createdAt: -1 })
        .limit(1)
        .toArray();
    return exchangeRates;
}

app.get('/', async (req, res) => {
    try {
        const exchangeRates = await getLastExchangeRates();

        if (exchangeRates.length === 0) {
            return res.render('index', { exchangeRates: [] });
        }

        res.render('index', { exchangeRates });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});