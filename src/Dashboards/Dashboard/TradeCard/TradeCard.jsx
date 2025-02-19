import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './TradeCard.scss';

const TradeCard = () => {
  const [userId, setUserId] = useState(null);
  const [balances, setBalances] = useState({});
  const [coinPrices, setCoinPrices] = useState({});
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [feeAmount, setFeeAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔥 Automatically load the user from token
  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.id);
        fetchBalances(decoded.id);
      } catch (error) {
        console.error('❌ Error decoding token:', error);
      }
    } else {
      console.error('🚨 No token found! Login again.');
    }
  }, []);

  // Fetch coin prices from Coinlore API
  useEffect(() => {
    fetchCoinPrices();
  }, []);

  // Fetch balances and convert the amount when the user selects a new currency or amount
  useEffect(() => {
    if (fromCurrency && toCurrency && amount > 0 && coinPrices[fromCurrency] && coinPrices[toCurrency]) {
      const fromPrice = coinPrices[fromCurrency];
      const toPrice = coinPrices[toCurrency];

      // Ensure both fromPrice and toPrice are valid
      if (fromPrice && toPrice && !isNaN(fromPrice) && !isNaN(toPrice)) {
        // Calculate the fee (3.5%)
        const feePercentage = 0.035; // 3.5% fee
        const fee = amount * feePercentage; // Fee amount
        const amountAfterFee = amount - fee; // Amount after fee

        // Calculate the conversion from `fromCurrency` to `toCurrency`
        const rate = fromPrice / toPrice;
        const convertedAmountAfterFee = amountAfterFee * rate;

        // Set the fee amount and converted amount
        setFeeAmount(fee); // Set the fee
        setConvertedAmount(convertedAmountAfterFee); // Set the converted amount in `toCurrency`
      } else {
        console.error('❌ Invalid price data for conversion.');
        setFeeAmount(0);
        setConvertedAmount(0);
      }
    }
  }, [fromCurrency, toCurrency, amount, coinPrices]);

  // ✅ Automatically fetch balances every 10 seconds to keep data fresh
  useEffect(() => {
    const interval = setInterval(() => {
      if (userId) fetchBalances(userId);
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, [userId]);

  const fetchBalances = async (id) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        console.error('🚨 No token found! Login again.');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        'https://server.capital-trust.eu/api/userss',
        { id },
        { headers }
      );

      // Remove 'total' from balance list
      const filteredBalances = Object.fromEntries(
        Object.entries(response.data).filter(([key]) => key !== 'total')
      );

      setBalances(filteredBalances);

      const balanceKeys = Object.keys(filteredBalances);
      if (balanceKeys.length >= 2) {
        setFromCurrency(balanceKeys[0]); // First currency
        setToCurrency(balanceKeys[1]); // Second currency
      }
    } catch (error) {
      console.error('❌ Error fetching balances:', error.response?.data || error.message);
    }
  };

  const fetchCoinPrices = async () => {
    try {
      // Use a service like Coinlore to fetch live coin prices
      const response = await axios.get('https://api.coinlore.net/api/tickers/');

      const coinsWithPrice = response.data.data.reduce((acc, coin) => {
        acc[coin.symbol.toLowerCase()] = parseFloat(coin.price_usd); // Store the price with the coin symbol
        return acc;
      }, {});

      console.log("✅ Fetched Coin Prices:", coinsWithPrice);
      setCoinPrices(coinsWithPrice); // Set the fetched prices to state
    } catch (error) {
      console.error("❌ Error fetching coin prices:", error.message);
    }
  };

  const handleTrade = async () => {
    if (!amount || amount <= 0) {
      alert('Enter a valid amount to trade.');
      return;
    }

    // Check if the user has enough balance to trade
    if (balances[fromCurrency] < amount) {
      alert(`You don't have enough ${fromCurrency} to trade.`);
      return;
    }

    // Calculate the remaining balance after the trade
    const remainingBalance = balances[fromCurrency] - amount;

    // Calculate the total fee (3.5%) of the trade amount in `fromCurrency` USD value
    const fromPrice = coinPrices[fromCurrency];
    const feePercentage = 0.035; // 3.5% fee
    const totalFee = amount * feePercentage * fromPrice;
    console.log('Total Fee in USD:', totalFee); // Log the fee amount in USD

    // Calculate the final amount in the `toCurrency` after applying the fee
    const toPrice = coinPrices[toCurrency];
    const finalAmountInToCurrency = ((amount * fromPrice) - totalFee) / toPrice;
    console.log('Final amount in target currency:', finalAmountInToCurrency); // Log final converted amount in `toCurrency`

    // Prepare the trade data to send to the backend
    const tradeData = {
      userId,
      fromCurrency,
      toCurrency,
      amount: remainingBalance, // Send the remaining balance after the trade
      fee: totalFee, // Send the total fee
      convertedAmount: finalAmountInToCurrency, // Send the converted amount
    };

    console.log('Trade Data:', tradeData); // Log the trade data before sending

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Send the trade data to the backend
      const response = await axios.post(
        'https://server.capital-trust.eu/api/trade',
        tradeData,
        { headers }
      );

      alert(response.data.message);
      fetchBalances(userId); // Refresh balances after trade
    } catch (error) {
      console.error('❌ Trade error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Trade failed.');
    }
};


  return (
    <div className="trade-card">
      <h2 className="trade-card-title">Crypto Trading</h2>

      <div className="trade-card-row">
        <label>From:</label>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {Object.keys(balances).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="trade-card-row">
        <label>To:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(balances).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <input type="text" value={convertedAmount.toFixed(6)} disabled />
      </div>

      <p>You will receive: {convertedAmount.toFixed(6)} {toCurrency}</p>
      <p>Fee (3.5%): {feeAmount.toFixed(6)} {fromCurrency}</p>

      <button className="trade-button" onClick={handleTrade}>
        Trade
      </button>
    </div>
  );
};

export default TradeCard;
