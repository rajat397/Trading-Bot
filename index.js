// index.js

const { getStockPrices } = require('./data/mockApi'); // Mock data generator
const { executeTrade, showProfitLossSummary } = require('./tradingLogic');
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const stockSymbol = 'IBM'; // Simulated stock symbol

// Fetch synthetic stock prices and execute trades every minute
const botInterval = setInterval(async () => {
  const stockData = await getStockPrices(stockSymbol);

  if (stockData) {
    console.log(`Current price of ${stockData.symbol} at ${stockData.time}: $${stockData.price}`);
    executeTrade(stockData.price, stockData.history);
  } else {
    console.log('Error generating stock prices. Skipping this iteration.');
  }
}, 6000); // Fetch data every minute

// Stop the bot after 10 iterations (for example, after 10 minutes)
setTimeout(() => {
  clearInterval(botInterval);
  showProfitLossSummary(); // Show profit/loss summary after bot stops
}, 60000 * 10); // Run for 10 minutes

app.listen(PORT, () => {
  console.log(`Trading bot server is running on port ${PORT}`);
});
