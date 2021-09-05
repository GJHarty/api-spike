require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();
const axios = require('axios');

// API Query upon NEW_SEARCH
router.post('/', (req, res) =>{
    console.log('req.body.data is', req.body);
    axios({
        method: 'GET',
        url: 'https://finnhub.io/api/v1/quote',
        params: {
            token: process.env.FIN_API_KEY,
            symbol: req.body.data,
        }
    }).then(apiRes => {
        console.log('dbRes.data :', apiRes.data);
        res.send(apiRes.data);
    }).catch(err => {
        console.log('giphy error', err);
        res.sendStatus(500);
    })
})

// API Query upon NEW_SEARCH
router.get('/', (req, res) =>{
    let date = new Date();
    let today = Math.round(Date.now() / 1000);
    console.log('today',today);
    axios({
        method: 'GET',
        url: 'https://finnhub.io/api/v1/stock/candle',
        params: {
            token: process.env.FIN_API_KEY,
            symbol: 'AAPL',
            resolution: 'D',
            from: today - 604800,
            to: today,
        }
    }).then(apiRes => {
        console.log(apiRes.data);
        res.send(apiRes.data);
    }).catch(err => {
        console.log('giphy error', err);
        res.sendStatus(500);
    })
})

module.exports = router;