# QuantInsight Lab

QuantInsight Lab is an AI-assisted quantitative finance web application built with Python and Flask.  
It allows users to upload stock market data, analyze price trends, test trading strategies, generate rule-based buy scores, and run machine-learning-based market direction prediction.

This project was developed with the assistance of Cursor AI. The product idea, feature planning, testing, debugging, UI direction, and final integration were guided by the project owner.

---

## Live Demo

[Open QuantInsight Lab][https://your-render-url.onrender.com](https://quantinsight-lab.onrender.com/)

Replace the link above with your actual Render website URL.

---

## Project Overview

QuantInsight Lab is designed as a decision-first stock analysis dashboard.  
Instead of only showing raw stock data, the system helps users answer practical questions such as:

- What does the current market data look like?
- Is the stock showing a weak, neutral, or bullish signal?
- Which trading strategy performs better on the uploaded data?
- What does the Random Forest model predict for the next 5 trading days?
- How do different machine learning models compare?

The project is mainly for learning, research, and portfolio demonstration purposes.

---

## Key Features

### 1. Stock Data Upload

Users can upload stock market CSV files for analysis.

Supported data includes:

- Date
- Open
- High
- Low
- Close
- Volume

The system automatically cleans and validates the uploaded data.

---

### 2. Market Dashboard

The dashboard provides an overview of the uploaded stock data, including:

- Date range
- Total rows
- Average close price
- Maximum close price
- Minimum close price
- Average volume
- Price chart
- Moving average chart
- Volume chart
- Daily return distribution

---

### 3. Buy Score System

QuantInsight Lab includes a rule-based Buy Score System.

The score is calculated using technical indicators such as:

- RSI
- MACD
- Moving averages
- Volume signals

The system gives a final recommendation such as:

- Strong Buy
- Buy
- Neutral
- Weak
- Avoid

This feature works like a simple rule-based expert system for stock signal evaluation.

---

### 4. Strategy Lab

Users can test trading strategies on uploaded stock data.

Current strategy logic includes:

- Moving Average strategy
- RSI strategy
- MACD strategy

The system calculates performance metrics such as:

- Total return
- Annualized return
- Sharpe ratio
- Maximum drawdown
- Volatility
- Win rate

---

### 5. Strategy Comparison

The Strategy Comparison page compares different trading strategies on the same dataset.

It helps users understand which strategy is more suitable for the current stock data.

Example comparison:

- Moving Average strategy
- RSI strategy
- MACD strategy

---

### 6. Machine Learning Analysis

The ML Analysis page provides three workflows:

1. AI Direction Predictor  
2. Compare All Models  
3. Train Single Model  

The goal is to make the ML page easier to use for both normal users and advanced users.

---

### 7. Random Forest Predictor

The Random Forest Predictor estimates whether the stock price may rise in the next 5 trading days.

It provides:

- Up probability
- Down probability
- Recommendation
- Test accuracy
- Feature importance

The model uses technical features such as:

- Daily return
- RSI
- MACD
- Moving averages
- Volume ratio
- Volatility

---

### 8. Report Page

The report page summarizes the analysis result and provides a cleaner view of the key findings.

---

## Tech Stack

- Python
- Flask
- Pandas
- NumPy
- Matplotlib
- Plotly
- Scikit-learn
- YFinance
- Gunicorn
- HTML
- CSS
- JavaScript
- Cursor AI

---

## Project Structure

```text
quantinsight-lab/
│
├── app.py
├── config.py
├── requirements.txt
├── Procfile
├── runtime.txt
├── README.md
│
├── modules/
│   ├── backtester.py
│   ├── buy_score.py
│   ├── data_agent.py
│   ├── data_cleaner.py
│   ├── data_loader.py
│   ├── indicators.py
│   ├── ml_engine.py
│   ├── ml_predictor.py
│   ├── report_builder.py
│   ├── strategies.py
│   └── visualizer.py
│
├── templates/
│   ├── base.html
│   ├── upload.html
│   ├── dashboard.html
│   ├── strategy.html
│   ├── strategy_comparison.html
│   ├── ml_analysis.html
│   └── report.html
│
├── static/
│   ├── css/
│   ├── js/
│   ├── assets/
│   └── generated/
│
└── uploads/
