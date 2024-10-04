# Trading Bot Documentation

## 1. Introduction
This document provides an overview of the trading bot implemented using the Moving Average Crossover strategy. The bot fetches stock price data (generated synthetically in this version), applies a simple algorithm to decide when to buy or sell based on moving averages, tracks profit and loss, and logs all trades made during its execution.

## 2. Trading Strategy: Moving Average Crossover
The Moving Average Crossover strategy is a technical analysis tool used to identify potential buy and sell signals based on moving averages of stock prices.

- **Short-Term Moving Average**: The average price over a shorter period (5 periods in this implementation).
- **Long-Term Moving Average**: The average price over a longer period (20 periods in this implementation).

### Buy Signal:
When the short-term moving average crosses above the long-term moving average, a buy signal is generated. This suggests that the stock price might be trending upward.

### Sell Signal:
When the short-term moving average crosses below the long-term moving average, a sell signal is generated, indicating a possible downward trend.

## 3. System Components
- **mockApi.js**: Generates synthetic stock price data.
- **tradingLogic.js**: Core trading logic, calculating moving averages, executing trades, tracking profit/loss.
- **index.js**: Main application that fetches data, executes trades, and logs results.

## 4. How to Run the Application

### Clone the Repository
Clone the project repository to your local machine:

```bash
git clone https://github.com/rajat397/Trading-Bot.git
cd trading-bot
```

Install Dependencies
Install the required packages using npm:

```bash
npm install
```

Configure Environment Variables
Optionally, create a .env file if you need to change any environment settings, such as the port number.

Example .env:
PORT=3000


Run the Trading Bot
Run the bot using npm:
```bash
npm start
```

View Logs
As the bot runs, it will:

- Fetch stock prices.
- Log buy and sell trades to logs.txt.
- Print a summary of the final profit and loss when the trading session ends.

## 5. Trade Logging and Profit/Loss Tracking
- Trades (buy/sell) are recorded in logs.txt with timestamps and prices.
- At the end of the session, the final balance and profit/loss summary are logged.

