import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Chart.js library for graph
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './CryptoData.scss';

// Register the necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoData = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null); // Store selected coin for graph
  const [coinHistory, setCoinHistory] = useState([]); // Store historical data for graph
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,litecoin,cardano,binancecoin,xrp,solana,polkadot,dogecoin,shiba-inu,tron,uniswap,chainlink,litecoin,ethereum-classic,vechain,monero,ethereum,stellar,cosmos,terraluna,elrond,bittorrent',
          },
        });
        setCryptoData(response.data);
        setSelectedCoin(response.data.find(coin => coin.id === 'bitcoin')); // Set Bitcoin as default coin
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      const interval = setInterval(() => {
        fetchCoinHistory(selectedCoin.id);
      }, 10000); // Fetch data every 10 seconds (you may adjust this)
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [selectedCoin]);

  // Function to fetch daily historical data for the selected coin
  const fetchCoinHistory = async (coinId) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: '30', // Fetch data for the last 30 days
          interval: 'daily', // Ensure we get one point per day
        },
      });
      setCoinHistory(response.data.prices); // The API should return 1 price per day
    } catch (err) {
      console.error('Error fetching coin history:', err);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin); // Set selected coin to display graph
    setCoinHistory([]); // Clear previous graph data
  };

  // Prepare chart data
  const chartData = {
    labels: coinHistory.map((data) => new Date(data[0]).toLocaleDateString()), // Format the date to show one per day
    datasets: [
      {
        label: selectedCoin ? selectedCoin.name : 'Select a coin',
        data: coinHistory.map((data) => data[1]), // Use the price for each day
        fill: true,  // Fill the area below the line
        borderColor: 'hsla(28, 40%, 45%, 1)', // Line color
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          gradient.addColorStop(0, 'rgba(255, 159, 64, 0.4)'); // Starting color
          gradient.addColorStop(1, 'rgba(255, 159, 64, 0)'); // Ending color (transparent)
          return gradient;
        },
        tension: 0.4, // Make the line curve
        borderWidth: 2, // Optional: You can adjust the thickness of the line
      },
    ],
  };

  return (
    <div className="crypto-data-container">
      <h2>Cryptocurrency Prices</h2>
      <div className="crypto-data">
        {/* Left column for the list of coins */}
        <div className="crypto-list">
          {cryptoData.map((coin) => (
            <div
              key={coin.id}
              className="crypto-card"
              onClick={() => handleSelectCoin(coin)}
            >
              <div className="coin-logo">
                <img className="coin-logo1" src={coin.image} alt={coin.name} />
              </div>
              <div className="coin-name">
                <h3>{coin.name}</h3>
                <h4>{coin.name} to US Dollar</h4>
              </div>
              <div className="coin-price">
                <p>Price:</p><p> ${coin.current_price}</p>
              </div>
              <div className="coin-change">
                <p>24h Change:</p><p> {coin.price_change_percentage_24h}%</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right column for the graph */}
        <div className="crypto-graph">
          {selectedCoin && coinHistory.length > 0 ? (
            <Line data={chartData} options={{ responsive: true }} />
          ) : (
            <p>Select a coin to view the graph.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoData;
