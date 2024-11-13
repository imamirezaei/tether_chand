require('dotenv').config();
const mongoose = require('mongoose');
const { fetchDataAndStoreInDB } = require('./controller/fetchDataController');
const exchanges = require('./exchanges');
const logger = require('./config/logger');


const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    logger.info('Connected to MongoDB');
}).catch(err => {
    logger.error('Error connecting to MongoDB', err);
});

async function startFetchingData() {
    for (const exchange of exchanges) {
        setInterval(() => fetchDataAndStoreInDB(exchange), parseInt(process.env.FETCH_INTERVAL, 10));
    }
}

(async () => {
    startFetchingData();
})();
