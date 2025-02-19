import React, { useState } from "react";
import "./Transactions.scss";
import Sidebar from "../../Sidebar/Sidebar";
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard";
import Footer from "../../../components/Footer/Footer";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Transaction Amounts ($)',
      data: [5000, 7000, 6500, 8000, 9500, 10500, 12000],
      fill: false,
      borderColor: '#4e73df',
      tension: 0.1,
    }
  ]
};
<Line
  data={chartData}
  options={{
    responsive: true,
    scales: {
      x: {
        grid: {
          color: '#ffffff', // Change the grid lines color to white for the x-axis
        },
      },
      y: {
        grid: {
          color: '#ffffff', // Change the grid lines color to white for the y-axis
        },
      },
    },
  }}
/>
// Sample transactions data
const transactions = [
  {
    id: "#2E293E",
    currency: "Bitcoin (BTC)",
    date: "12 April 2024",
    status: "Complete",
    amount: "$4,315",
    sender: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", // Example address
    receiver: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNb", // Example address
    transactionHash: "0x123abc456def789gh012ijk345lmn678op", // Example hash
  },
  {
    id: "#8F5C12",
    currency: "Ethereum (ETH)",
    date: "21 May 2024",
    status: "Complete",
    amount: "$7,891",
    sender: "0xC3B1f7FBA48C51D5D4A3A09D4E9E0F79B0E16B4E", // Example address
    receiver: "0xA1F1c5E8dA5D72c6c07f3c9fe5093e9D2D443F85", // Example address
    transactionHash: "0x9e58f1d5761d6d0b2a5d1271c0192e16a4fd8e2f", // Example hash
  },
  {
    id: "#4A9C8E",
    currency: "Ripple (XRP)",
    date: "10 July 2024",
    status: "Complete",
    amount: "$3,127",
    sender: "rKjdYkNi1Afkrz4as1yr1xx5A9kdtbHz6V", // Example address
    receiver: "rNhioTmdG7Uk5e6T8HYXVr2pNSZJ3C9Cdh", // Example address
    transactionHash: "R9ACXZB6JWV2KCD3S7LMPR9AXD8NWE9J28", // Example hash
  },
  {
    id: "#1B2E3D",
    currency: "Cardano (ADA)",
    date: "19 October 2024",
    status: "Complete",
    amount: "$2,459",
    sender: "DdzFFzCqrhtDpXAZW6phVdwM5X9YZV6HXM8ReKfZJ9CZnKv8Km8PfJh8dtE9pV8t5tzozLq5N1NrNhsfy7VXntNRn9B6x1BEXn2QFVb9", // Example address
    receiver: "DdzFFzCqrhtDpXAYh9ZfnyVVXWwTe11Hek7bJqxVdsqU1e14YnoNdrBxHTNH2b7S7pfjwex34bJvNNc6tvj9X28Y5LGe7wEq7N4dFBC", // Example address
    transactionHash: "TxNo.12345ABCDE", // Example hash
  },
  {
    id: "#6C3A9D",
    currency: "Solana (SOL)",
    date: "25 December 2024",
    status: "Complete",
    amount: "$5,832",
    sender: "9wnh4aZXg7KM4c8wE9gDt5vNRz4fFh1TtRmu8zNK74bm", // Example address
    receiver: "7VaxQiwWRZ72g2FqfM3mAYM9HEFzvAm1pL2s4td7yxR2", // Example address
    transactionHash: "21cnX8zMk3hhXrmhJmK9WX7Z8jfhqwJf5FJ5f8j31fVt", // Example hash
  },
  // Pending Transactions
  {
    id: "#AB123F",
    currency: "Polkadot (DOT)",
    date: "5 January 2025",
    status: "Pending",
    amount: "$3,402",
    sender: "15kXxYbtmh5xg5dRpX7iFAi1QpkZ9CdJmPE9u7WsPTkn", // Example address
    receiver: "14A1TkZAA1nF7K7YmgVJf8nF5sEGrcecsjRj6Dh5ovX6", // Example address
    transactionHash: "0x7b9f0aef982bda03cd967dce80197a2edc08e0e8", // Example hash
  },
  {
    id: "#FF5A4B",
    currency: "Bitcoin (BTC)",
    date: "6 January 2025",
    status: "Pending",
    amount: "$6,800",
    sender: "1DxvqXzn4Jnb2Kxq1zDgKsxUEjLeS3B8jZwmH5D1ZFPy", // Example address
    receiver: "1BB6S6U9ZZR2wVwn2fgzfrXjfXq5WAzL8D9U3y1z5e4", // Example address
    transactionHash: "0x4e4a4f9e00db08b76f4f1d1cdfe4f212f1ef1c7b", // Example hash
  },
  {
    id: "#A12E3F",
    currency: "Ethereum (ETH)",
    date: "7 January 2025",
    status: "Pending",
    amount: "$8,214",
    sender: "0xAB1b59c62fDD54b71D4F5c231f0e6d4795A84540", // Example address
    receiver: "0x497b9e71f760e02d4925E14E37aD1455b72d7685", // Example address
    transactionHash: "0x80fd2d8b7a328b1e9db9e380d5f31dbe45c458fd", // Example hash
  },
  {
    id: "#9C4F23",
    currency: "Binance Coin (BNB)",
    date: "10 January 2025",
    status: "Complete",
    amount: "$2,546",
    sender: "bnb1nkjjqt4y63wldn4z6p7rzvmlrf78xg04rlsh7w", // Example address
    receiver: "bnb1kzjmjdsh42xwlpgrl68mpxyhjm63vs2l9qgh7d", // Example address
    transactionHash: "0xb0d4c3e9fdbd42d267a2c8012822b5f7d6c87c8d", // Example hash
  },
  {
    id: "#7B2D1F",
    currency: "Dogecoin (DOGE)",
    date: "11 January 2025",
    status: "Complete",
    amount: "$1,357",
    sender: "D7o9vptq1yEZ3VjmzFwMv9JxG1bqsh7gdzra", // Example address
    receiver: "D3vNjY2Fc8qbuRewTkcbFbVs4mYTxu8J9VrW", // Example address
    transactionHash: "D8g3bf32e1f54392d9fc1c22069b24dbdf08f7a0", // Example hash
  },
  {
    id: "#3C91B6",
    currency: "Shiba Inu (SHIB)",
    date: "13 January 2025",
    status: "Complete",
    amount: "$789",
    sender: "0x5A1b7F3202Dd99B23d7b0A2acDa7a17D97A8C32F", // Example address
    receiver: "0x1E1fDb8BcbE3b3B7A9dbC19484A7d053c3E2Bd75", // Example address
    transactionHash: "0xd0947f4b96cbf0e1df9898d1a828e0cc1a60a12b", // Example hash
  },
  {
    id: "#EC7A91",
    currency: "Litecoin (LTC)",
    date: "15 January 2025",
    status: "Pending",
    amount: "$4,983",
    sender: "Lfc4X2HkJ93dmt82rNymckuxLfZbVmu9FZyHroQ5B8bh", // Example address
    receiver: "Mgy8J7Ygq5E1XZfKrhF9kNFSqfjTuNzKwwV6c8nqa5b", // Example address
    transactionHash: "0x309872d6f0d91a4c6d8b1799c01356708b17a940", // Example hash
  },
  {
    id: "#D12C87",
    currency: "Chainlink (LINK)",
    date: "17 January 2025",
    status: "Pending",
    amount: "$2,645",
    sender: "0xFf2a0B8dD09e7bD3826F5719b39d0D9F1B70D76F", // Example address
    receiver: "0x2a3A2384B45E8c07F4cda9a45f36429e85D5DDBD", // Example address
    transactionHash: "0x97e39f8d10db346cf9f808ef517167f56f32e09e", // Example hash
  },
  {
    id: "#7D5F92",
    currency: "Stellar (XLM)",
    date: "19 January 2025",
    status: "Pending",
    amount: "$1,947",
    sender: "GDDckmS7n7tbLbkX9EuBfPMH1e5GjshmtuhX5r7v8s2", // Example address
    receiver: "GBprP2waCRfWVvzxGB5QVoZpV7D8SPqstb7sZ4LCh8e", // Example address
    transactionHash: "0x183d7fb212b3cb575d19abbd12328d97cde7822d", // Example hash
  },
  {
    id: "#1A9C4F",
    currency: "Polygon (MATIC)",
    date: "21 January 2025",
    status: "Complete",
    amount: "$3,175",
    sender: "0xE85922a20823631A7488BFD21E67A14c91Be15e0", // Example address
    receiver: "0x2b7a1a7E0B019b3C0A0dF144A283F34F9bb263e6", // Example address
    transactionHash: "0xc8be09f823d44a28726811d4d5f9705d0d9056b4", // Example hash
  },
  {
    id: "#4E9C5B",
    currency: "Avalanche (AVAX)",
    date: "23 January 2025",
    status: "Complete",
    amount: "$5,620",
    sender: "XyQ9Xtwwm9pAhrB88huNUBqdHZm2DhV67bdnd3jKLfr", // Example address
    receiver: "Xy2ZMbq8AbF7GkF1wsqXk4gYqtF7GjK9p5kp9v8e42t", // Example address
    transactionHash: "0xab913739cefd6bca575b9a451fb7da4a3e05b07e", // Example hash
  },
  {
    id: "#8F1D46",
    currency: "Uniswap (UNI)",
    date: "25 January 2025",
    status: "Pending",
    amount: "$4,245",
    sender: "0x04a6ac5e7f8a37952d41b2c2bb2b1cd4c73ecf9d", // Example address
    receiver: "0xe0b09ec4d2723be7b7df71f7f383b3b8475c4c00", // Example address
    transactionHash: "0x20db6edfa7561e764d7b0a7d02f49f67f7d4d3a0", // Example hash
  },
  {
    id: "#A3E9B4",
    currency: "VeChain (VET)",
    date: "27 January 2025",
    status: "Complete",
    amount: "$2,654",
    sender: "0x3C2B9Ff8401D8EAF60C60228d6c4a4C8C9D14C98", // Example address
    receiver: "0x9F5b8A47BBd72501Bf89A81A69E21BB50B110d1C", // Example address
    transactionHash: "0xd97fb56b5b40df5d36f6fe1ef1c31b9a5a8bd02f", // Example hash
  },
];


const Transactions = () => {
  const [expandedRows, setExpandedRows] = useState({});
 const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };
  const toggleRow = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderShortened = (text) => {
    return `${text.substring(0, 6)}...`; // Shows first 6 characters followed by "..."
  };

  return (
    <div className="dashboard-container">
      <HeaderDashboard 
        toggleSidebar={toggleSidebar}
        sidebarActive={sidebarActive}
      />

      <Sidebar 
        sidebarActive={sidebarActive}
        toggleSidebar={toggleSidebar}
      />
      <div className="dashboard-content">
        <h2 className="title">Transactions</h2>
        <div className="chart-container">
          <h3>Transaction Amounts Over Time</h3>
          <Line data={chartData} options={{ responsive: true }} />
        </div>
        <div className="dashboard-row">
          <div className="transactions-table">
            <table className="scrollable-table">
              <thead className="scrollable-table-thead">
                <tr className="scrollable-table-tr">
                  <th className="scrollable-table-th">Transaction ID</th>
                  <th className="scrollable-table-th">Currency</th>
                  <th className="scrollable-table-th">Date</th> 
                  <th className="scrollable-table-th">Status</th>
                  <th className="scrollable-table-th">Amount</th>
                  <th className="scrollable-table-th">Sender</th>
                  <th className="scrollable-table-th">Receiver</th>
                  <th className="scrollable-table-th">Transaction Hash</th>
                </tr>
              </thead>
              <tbody className="scrollable-table-tbody">
                {transactions.map((transaction, index) => (
                  <tr  key={index} className={transaction.status.toLowerCase()}>
                    <td className="scrollable-table-td">{transaction.id}</td>
                    <td className="scrollable-table-td">{transaction.currency}</td>
                    <td className="scrollable-table-td">{transaction.date}</td>
                    <td className={`status ${transaction.status.toLowerCase() === 'pending' ? 'pending' : 'complete'}`}>
  {transaction.status}
</td>
                    <td className="scrollable-table-td">{transaction.amount}</td>
                    <td className="scrollable-table-td">
                      <span 
                        onClick={() => toggleRow(transaction.id)} 
                        style={{cursor: 'pointer'}}
                      >
                        {expandedRows[transaction.id] ? transaction.sender : renderShortened(transaction.sender)}
                      </span>
                    </td>
                    <td className="scrollable-table-td">
                      <span 
                        onClick={() => toggleRow(transaction.id)} 
                        style={{cursor: 'pointer'}}
                      >
                        {expandedRows[transaction.id] ? transaction.receiver : renderShortened(transaction.receiver)}
                      </span>
                    </td>
                    <td className="scrollable-table-td">
                      <span 
                        onClick={() => toggleRow(transaction.id)} 
                        style={{cursor: 'pointer'}}
                      >
                        {expandedRows[transaction.id] ? transaction.transactionHash : renderShortened(transaction.transactionHash)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
