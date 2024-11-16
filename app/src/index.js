require('dotenv').config();
const { startFetchingData } = require('./controller/fetchDataController');
const logger = require('./config/logger');

(async function main() {
    logger.info('Starting TetherChand Service...');
    startFetchingData();
})();
