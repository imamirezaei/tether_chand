const express = require('express');
const router = express.Router();
const Exir = require('../models/ExchangeRate'); // Adjust the path based on your project structure

router.get('/', async (req, res) => {

    console.log(1)
    try {
        const exirData = await Exir.findOne({}, { 'data.low': 1, 'data.last': 1, name: 1 });
        const formattedData = {
            name: exirData.name,
            sellPrice: exirData.data.low,
            buyPrice: exirData.data.last
        };
        //res.render('index', { exir: formattedData });
    } catch (error) {
        console.error('Error fetching Exir data:', error);
        //res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
