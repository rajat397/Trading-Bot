const fs = require('fs');

let balance = 10000; // Initial balance in dollars
let position = 0;    // Current stock position
let tradeHistory = []; // Array to store trade history

// Execute trade based on Moving Average Crossover strategy
const executeTrade = (currentPrice, history) => {
  const shortTermMA = calculateMovingAverage(history, 5);  // 5-period moving average (short-term)
  const longTermMA = calculateMovingAverage(history, 20);  // 20-period moving average (long-term)

  // Check for moving average crossover conditions
  if (shortTermMA > longTermMA && balance >= currentPrice) {
    // Buy if short-term MA crosses above long-term MA and we have enough balance
    position += 1;  // Buy 1 stock
    balance -= currentPrice; // Deduct balance
    logTrade('BUY', currentPrice);
  } else if (shortTermMA < longTermMA && position > 0) {
    // Sell if short-term MA crosses below long-term MA and we have stocks
    position -= 1;  // Sell 1 stock
    balance += currentPrice;  // Increase balance
    logTrade('SELL', currentPrice);
  }
};

// Calculate moving average over a given period
const calculateMovingAverage = (history, period) => {
  if (history.length < period) return history[0];  // Prevents calculation if not enough data
  const recentPrices = history.slice(0, period);
  const average = recentPrices.reduce((sum, price) => sum + price, 0) / period;
  return average;
};

// Log trade details to logs.txt file
const logTrade = (action, price) => {
  const tradeEntry = `${new Date().toISOString()} - ${action} at $${price}\n`;
  fs.appendFileSync('logs.txt', tradeEntry); // Log to file
  tradeHistory.push({ action, price, time: new Date() }); // Keep record in memory
};

// Show profit/loss summary at the end
const showProfitLossSummary = () => {
  const finalPrice = tradeHistory.length > 0 ? tradeHistory[tradeHistory.length - 1].price : 0;
  const finalBalance = balance + position * finalPrice; // Include current stock value in balance
  const profitLoss = finalBalance - 10000;  // Initial balance was $10,000

  console.log(`Final Balance: $${finalBalance.toFixed(2)}`);
  console.log(`Profit/Loss: $${profitLoss.toFixed(2)}`);

  // Write summary to log file
  fs.appendFileSync('logs.txt', `Final Balance: $${finalBalance.toFixed(2)}\nProfit/Loss: $${profitLoss.toFixed(2)}\n`);
};

module.exports = { executeTrade, showProfitLossSummary };
