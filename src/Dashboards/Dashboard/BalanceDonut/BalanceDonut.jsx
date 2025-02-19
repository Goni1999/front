import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './BalanceDonut.scss';

const BalanceDonut = () => {
  const [data, setData] = useState([]); // user's coin data
  const [userId, setUserId] = useState(null); // current user ID
  const [coinPrices, setCoinPrices] = useState({}); // store real coin prices (USD)

  // ✅ Extract userId from token & fetch balances on load
  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!storedToken) {
      console.error("🚨 No token found! Login again.");
      return;
    }

    try {
      const decodedToken = jwtDecode(storedToken);
      setUserId(decodedToken.id);
      fetchBalances(decodedToken.id);
      fetchCoinPrices(); // Fetch coin prices from an external API
    } catch (error) {
      console.error('❌ Error decoding token:', error);
    }
  }, []);

  // ✅ Fetch balances & prices every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (userId) {
        fetchBalances(userId);
        fetchCoinPrices(); // Fetch coin prices again every 10 seconds
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [userId]);

  // ✅ Fetch user balances (coins and amounts)
  const fetchBalances = async (id) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        console.error("🚨 No token found! Login again.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        'https://server.capital-trust.eu/api/userss', 
        { id }, // Sending the ID as part of the request body
        { headers }
      );

      console.log("✅ Updated Balance Data:", response.data);
      const userData = response.data; // user data with coins like { btc: 1, eth: 0, ... }
      setData(formatData(userData)); // Format the data for the chart
    } catch (error) {
      console.error('❌ Error fetching balances:', error.response?.data || error.message);
    }
  };

  // ✅ Format data to be used in the chart (only coins that have a non-zero amount)
  const formatData = (userData) => {
    return Object.keys(userData)
      .filter((coin) => coin !== 'total' && parseFloat(userData[coin]) > 0) // Exclude 'total' and zero-amount coins
      .map((coin) => ({
        name: coin.toUpperCase(),
        amount: parseFloat(userData[coin]) || 0,
      }));
  };

  // ✅ Fetch actual coin prices (USD) using Coinlore API or similar service
  const fetchCoinPrices = async () => {
    try {
      // Use a service like Coinlore to fetch live coin prices
      const response = await axios.get('https://api.coinlore.net/api/tickers/');

      const coinsWithPrice = response.data.data.reduce((acc, coin) => {
        acc[coin.symbol.toUpperCase()] = parseFloat(coin.price_usd); // Store the price with the coin symbol
        return acc;
      }, {});

      console.log("✅ Fetched Coin Prices:", coinsWithPrice);
      setCoinPrices(coinsWithPrice); // Set the fetched prices to state
    } catch (error) {
      console.error("❌ Error fetching coin prices:", error.message);
    }
  };

  // ✅ Calculate total value of the user's holdings based on the current coin prices
  const totalUSD = data.reduce((acc, coin) => {
    const coinPrice = coinPrices[coin.name]; // Get the price of the coin
    if (coinPrice) {
      acc += coin.amount * coinPrice; // Add the coin's value to the total
    }
    return acc;
  }, 0);

  // ✅ Prepare data for the chart
  const formattedChartData = data.map((coin) => {
    const coinPrice = coinPrices[coin.name]; // Get the price of the coin
    return {
      name: coin.name,
      amount: coin.amount,
      usdValue: coin.amount * coinPrice,
    };
  });

  const chartData = {
    labels: formattedChartData.map((coin) => `${coin.name} (${coin.amount})`),
    datasets: [
      {
        data: formattedChartData.map((coin) => {
          return totalUSD > 0 ? (coin.usdValue / totalUSD) * 100 : 0; // Calculate percentage
        }),
        backgroundColor: [
          '#F7931A', '#627EEA', '#00A98F', '#FF4500', '#2A9D8F', '#E63946', '#6A0572', '#F4A261', '#264653'
        ],
        borderWidth: 3,
        hoverOffset: 7,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const coin = formattedChartData[tooltipItem.dataIndex];
            return `${coin.name}: $${coin.usdValue.toFixed(2)} (${tooltipItem.raw.toFixed(1)}%)`;
          },
        },
      },
    },
    cutout: '60%', // Adjust cutout to restore donut size
  };

  return (
    <div className="balance-donut-card">
      <div className="balance-info">
        <h2>Total Balance</h2>
        <p className="crypto-amount">
          {formattedChartData.map((coin) => `${coin.amount} ${coin.name}`).join(', ')}
        </p>
        {/* Display the sum of USD value of all coins */}
        <p className="usd-amount">${totalUSD.toFixed(2)}</p> {/* Total USD value of all coins */}
      </div>
      <div className="donut-chart-container">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BalanceDonut;
