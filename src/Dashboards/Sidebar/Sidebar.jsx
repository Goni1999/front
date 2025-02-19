import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = ({ sidebarActive, toggleSidebar }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024); // Track large screen size
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine the class for sidebar based on screen size and active state
  const sidebarClass = isLargeScreen ? 'sidebar open large-screen' : `sidebar ${sidebarActive ? 'open' : ''}`;

  return (
    <div className={sidebarClass}>
      {/* Hamburger menu for small screens */}
      {!isLargeScreen && (
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      )}

      {/* Sidebar menu items */}
      <ul className="sidebar-menu">
        <li className="sidebar-item" >
        <button className="button-menu" onClick={() => handleRedirect('/dashboard')}>
          <img src="/images/dashboard.png" alt="Dashboard Icon" className="sidebar-icon" />
          Dashboard</button>
        </li>
        <li className="sidebar-item" >
        <button className="button-menu" onClick={() => handleRedirect('/exchange')}>
          <img src="/images/exchange.png" alt="Exchange Icon" className="sidebar-icon" />
          Exchange</button>
        </li>
        <li className="sidebar-item" >
        <button className="button-menu" onClick={() => handleRedirect('/prices')}>
          <img src="/images/prices.png" alt="Prices Icon" className="sidebar-icon" />
          Prices</button>
        </li>
        <li className="sidebar-item" >
        <button className="button-menu" onClick={() => handleRedirect('/activities')}>
          <img src="/images/activities.png" alt="Activities Icon" className="sidebar-icon" />
          Activities</button>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
