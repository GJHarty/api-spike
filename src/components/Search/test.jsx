const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c4mqg2qad3iak0auhc2g"
const finnhubClient = new finnhub.DefaultApi()

finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, {}, (error, data, response) => {
  console.log(data)
});

