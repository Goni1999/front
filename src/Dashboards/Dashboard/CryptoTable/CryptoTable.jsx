import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './CryptoTable.scss';

const CryptoTable = () => {
  const [cryptoData, setCryptoTable] = useState([]);
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
        setCryptoTable(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="crypto-data-containerr">
      <h2>Watchlist</h2>
      <div className="crypto-tablee">
        <table>
          <thead>
            <tr>
              <th>Name & Icon</th>
              <th>Price</th>
              <th>Last 24h Change</th>
              <th>Last 7d Change</th>
              <th>Market Cap</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((coin) => (
              <tr key={coin.id} className="crypto-roww">
                <td>
                  <div className="coin-logoo">
                    <img className="coin-logo11" src={coin.image} alt={coin.name} />
                    {coin.name}
                  </div>
                </td>
                <td>${coin.current_price}</td>
                <td>{coin.price_change_percentage_24h}%</td>
                <td>{coin.price_change_percentage_7d}%</td>
                <td>${coin.market_cap.toLocaleString()}</td>
                <td>${coin.total_volume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
