import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import HeaderDashboard from '../Dashboard/HeaderDashboard/HeaderDashboard';
import MonthlyGrowth from './MonthlyGrowth/MonthlyGrowth';
import RecentTransactions from './RecentTransactions/RecentTransactions';
import CryptoCards from './CardCrypto/CryptoCards'; 
import BalanceDonut from './BalanceDonut/BalanceDonut';
import './Dashboard.scss'; // External stylesheet for better styling
import Footer from '../../components/Footer/Footer';
import CryptoData from '../../components/CryptoData/CryptoData';
import CoinsTable from '../../components/CoinsTable/CoinsTable';

const userData = [
  { name: 'Bitcoin', percentage: 40, valueInUSD: 25000, amount: 0.5 },
  { name: 'Ethereum', percentage: 30, valueInUSD: 15000, amount: 10 },
  { name: 'Binance Coin', percentage: 20, valueInUSD: 5000, amount: 12 },
  { name: 'Others', percentage: 10, valueInUSD: 2500, amount: 20 },
];

const DashboardLayout = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
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
        <div className="dashboard-row">
          {/* First Row (BalanceDonut and MonthlyGrowth side-by-side) */}
          <div className="dashboard-card">
            <BalanceDonut data={userData} />
            <MonthlyGrowth />
          </div>
          <br />
          <div className="dashboard-card full-width">
            <CoinsTable />
          </div>
        </div>
        <br />
        <br />

        {/* Second Row (CryptoCards) */}
        <div className="dashboard-card full-width">
          <CryptoCards />
        </div>
        <br />
        <br />
        <div className="dashboard-card full-width">
          <CryptoData />
        </div>
        <br />
        <br />
        {/* Third Row (RecentTransactions) */}
        <div className="dashboard-card full-width">
          <RecentTransactions />
        </div>
        <br />
      </div>

    </div>
    
  );
};

export default DashboardLayout;
