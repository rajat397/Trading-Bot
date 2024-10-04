// mockApi.js

const generateSyntheticStockData = (symbol, startingPrice = 100, volatility = 0.02, historySize = 100) => {
    const stockData = {};
    let currentPrice = startingPrice;
  
    // Generate synthetic time-series data (random walk with slight volatility)
    for (let i = historySize; i >= 0; i--) {
      const time = new Date(Date.now() - i * 60000).toISOString(); // Timestamp for every minute
      const randomFactor = 1 + (Math.random() - 0.5) * volatility;
      currentPrice = parseFloat((currentPrice * randomFactor).toFixed(2));
  
      stockData[time] = {
        '1. open': currentPrice,
        '2. high': currentPrice * (1 + Math.random() * 0.01),
        '3. low': currentPrice * (1 - Math.random() * 0.01),
        '4. close': currentPrice,
        '5. volume': Math.floor(Math.random() * 1000 + 100), // Random volume between 100 and 1100
      };
    }
  
    return stockData;
  };
  
  // Function to get stock prices (mimics the structure of the Alpha Vantage API)
  const getStockPrices = async (symbol) => {
    try {
      const timeSeries = generateSyntheticStockData(symbol);
  
      // Get the latest timestamp (most recent data)
      const latestTime = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTime];
  
      const price = parseFloat(latestData['4. close']);
      
      return {
        symbol,
        price,
        time: latestTime,
        history: Object.values(timeSeries).map(entry => parseFloat(entry['4. close'])),
      };
  
    } catch (error) {
      console.error('Error generating synthetic stock prices:', error.message);
      return null; // Return null if there’s an error
    }
  };
  
  module.exports = { getStockPrices };
  