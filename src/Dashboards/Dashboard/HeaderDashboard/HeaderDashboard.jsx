import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HeaderDashboard.scss';

const HeaderDashboard = ({ logoSrc, bellIconSrc, toggleSidebar, sidebarActive }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
      return; // No need to fetch from backend
    }

    const fetchUserName = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          console.error("No token found.");
          return;
        }

        const response = await axios.post(
          'https://server.capital-trust.eu/getUserName',
          {},
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const handleRedirect = (path) => {
    navigate(path);
  };

  const handleSignOut = () => {
    // Clear session storage and local storage
    sessionStorage.clear();
    localStorage.clear();

    // Redirect to login page after sign-out
    navigate('/');
  };

  return (
    <header className="header-dashboard">
      <div className="header-left">
         {/* Hamburger button to toggle sidebar */}
         <button className="sidebar-toggle" onClick={toggleSidebar}>
          <span className="hamburger-icon">{sidebarActive ? 'X' : '≡'}</span>
        </button>
        <img
          src={logoSrc || "./images/logo.png"}
          alt="Logo"
          className="logo"
          onClick={() => handleRedirect('/')}
        />
      </div>

      <div className="header-right">
        <button
          className="notification-button"
          onClick={() => handleRedirect('/activities')}
        >
          <img src={bellIconSrc || 'images/notifications24.png'} alt="Notifications" className="bell-icon" />
        </button>

        {/* Welcome message with dropdown menu */}
        <div className="dropdown">
          <span className="welcome-text">Welcome, {userName || 'User'}!</span>
          <button className="dropdown-button">▼</button>
          <div className="dropdown-menu">
            <button className="button-menu" onClick={() => handleRedirect('/dashboard')}>Dashboard</button>
            <button className="button-menu" onClick={() => handleRedirect('/exchange')}>Trade</button>
            <button className="button-menu" onClick={() => handleRedirect('/prices')}>Live prices</button>
            <button className="button-menu" onClick={() => handleRedirect('/activities')}>Transactions</button>
            <button className="signout-menu" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
