import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import SignUp from '../SignUp/SignUp';
import LogIn from '../LogIn/LogIn';
import ReportCaseModal from '../ReportCaseModal/ReportCaseModal';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogIn, setShowLogIn] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSignUp = () => setShowSignUp(!showSignUp);
    const toggleLogIn = () => setShowLogIn(!showLogIn);

    const toggleDarkMode = () => {
        const newDarkModeState = !isDarkMode;
        setIsDarkMode(newDarkModeState);
        localStorage.setItem('isDarkMode', newDarkModeState);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const handleSignOut = () => {
        setUser(null);
        alert("You have successfully signed out.");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
                <Link to="/">
                    <div className="navbar-logo">
                        <img className="img-logo" width={150} src="/images/logo.png" alt="Logo" />
                    </div>
                </Link>

                {/* Hamburger Button for Mobile */}
                <button className="navbar-hamburger" onClick={toggleMobileMenu}>
                    <span className="hamburger-icon">☰</span>
                </button>

                {/* Navigation Links (visible on desktop and toggleable on mobile) */}
                <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
                    <li className="navbar-item"><Link to="/">Home</Link></li>
                    <li className="navbar-item"><Link to="/contactus">Inform Us Now</Link></li>
                    <li className="navbar-item"><Link to="/about">About</Link></li>
                    <li className="navbar-item"><Link to="/services">Services</Link></li>
                    <li className="navbar-item"><Link to="/contact">FAQ</Link></li>

                    {/* Auth Buttons inside the mobile menu */}
                    {user ? (
                        <li className="navbar-item">
                            <div className="user-dropdown">
                                <span>{user.name}</span>
                                <div className="dropdown-menu">
                                    <button onClick={handleSignOut}>Sign Out</button>
                                </div>
                            </div>
                        </li>
                    ) : (
                        <>
                            
                            <li className="navbar-item">
                                <button className="auth-button-log-in" onClick={toggleLogIn}>Log In</button>
                            </li>
                            <li className="navbar-item">
                                <button className="auth-button-sign-up" onClick={toggleSignUp}>Sign Up</button>
                            </li>
                        </>
                    )}

                    {/* Dark Mode Toggle inside the mobile menu 
                    <li className="navbar-item">
                        <button className="theme-toggle" onClick={toggleDarkMode}>
                            {isDarkMode ? '☀️' : '🌙'}
                        </button>
                    </li>*/}
                </ul>
            </nav>

            {/* Modals for SignUp and LogIn */}
            {showSignUp && (
                <div className="modal-overlay" onClick={toggleSignUp}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <SignUp onSignUpSuccess={setUser} />
                        <button className="close-button" onClick={toggleSignUp}>Close</button>
                    </div>
                </div>
            )}

            {showLogIn && (
                <div className="modal-overlay" onClick={toggleLogIn}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <LogIn onLoginSuccess={setUser} />
                        <button className="close-button" onClick={toggleLogIn}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
