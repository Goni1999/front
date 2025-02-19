import React from 'react';
import { Link } from 'react-router-dom';
import './NotVerified.scss';

const NotVerified = () => {
  return (
    <div className="not-verified-page">
      <div className="not-verified-content">
        <h1>Your email is not verified yet</h1>
        <p>
          We have sent an email for your account verification. Please check your inbox.
        </p>
        <p>If you have any questions, feel free to <Link to="/contact">contact us</Link>.</p>
        <div className="waiting-container">
          <p>In the meantime, you can:</p>
          <ul>
            
            <li>Browse our blog and learn more about our services</li>
            <li>Check out the latest updates in the crypto world</li>
          </ul>
        </div>
        <div className="return-to-home">
          <Link to="/">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotVerified;
