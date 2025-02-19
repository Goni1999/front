import React, { useEffect, useState } from 'react';
import HeaderDashboard from '../../Dashboards/Dashboard/HeaderDashboard/HeaderDashboard';
import Sidebar from '../../Dashboards/Sidebar/Sidebar';
import CryptoCard1 from '../../Dashboards/Dashboard/CryptoCard/CryptoCard1';
import TradeCard from '../../Dashboards/Dashboard/TradeCard/TradeCard';
import { jwtDecode } from 'jwt-decode';
import InvestToday from '../../Dashboards/Dashboard/InvestToday/InvestToday';

const Exchange = () => {
  const [userId, setUserId] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUserId(decodedToken.id);
        console.log("🔍 Logged-in User ID:", decodedToken.id);
      } catch (error) {
        console.error("❌ Error decoding token:", error);
      }
    } else {
      console.error("🚨 No token found! Login again.");
    }
  }, []);

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
        <div className="dashboard-card full-width">

        <CryptoCard1 />
        </div>
        
        <div className="dashboard-card">
          {userId ? <TradeCard userId={userId} /> : <p>Loading user data...</p>}
          
            <InvestToday />
          </div>
      </div>
    </div>
    </div>

  );
};

export default Exchange;
