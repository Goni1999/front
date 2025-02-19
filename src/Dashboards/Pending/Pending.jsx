// PendingPage.js
import React from 'react';
import './Pending.scss';  // Import the SCSS file

const Pending = () => {
  return (
    <div className="pending-container">
      <div className="pending-message">
        <h1>Your account is pending</h1>
        <p>
          You have successfully submitted your KYC verification. Our team will review your documents and update your account status shortly. Thank you for your patience.
        </p>
        <div className="pending-actions">
          <button className="contact-support">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Pending;
