import React, { useState } from 'react';
import HeaderDashboard from '../../Dashboards/Dashboard/HeaderDashboard/HeaderDashboard';
import Sidebar from '../../Dashboards/Sidebar/Sidebar';
import CryptoCards from '../../Dashboards/Dashboard/CardCrypto/CryptoCards';
import CryptoTable from '../../Dashboards/Dashboard/CryptoTable/CryptoTable';
import './Prices.scss';
import CryptoData from '../../components/CryptoData/CryptoData';

const Prices = () => {
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
      <CryptoData />
        {/* Crypto cards section */}
        <CryptoCards />
        
        {/* Crypto prices table */}
        <CryptoTable />
      </div>
    </div>
  );
};

export default Prices;
