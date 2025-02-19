import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about-us">
          <h4>About Us</h4>
          <p>
            We provide secure and reliable recovery of your funds and investment solutions. Join us and take control of your financial future.
          </p>
          <img src="images/dmca.jpg" alt="DMCA" />
        </div>
        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#investment-form">Invest</a></li>
            <li><Link to="/contactus">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>Email: <a href="mailto:support@capitaltrust.com">support@capitaltrust.com</a></p>
          <p>Phone: <a href="tel:+1234567890">+1-234-567-890</a></p>
          <p>Address: 123 Crypto Lane, Blockchain City</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 CapitalTrust. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
