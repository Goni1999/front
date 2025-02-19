import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import styles from './App.css';
import Blog1 from './components/Blogs/Blog1';
import Blog2 from './components/Blogs/Blog2';
import Blog3 from './components/Blogs/Blog3';
import ContactUsNow from './pages/ContactUsNow/ContactUsNow';
import LogIn from './components/LogIn/LogIn';
import Dashboard from './Dashboards/Dashboard/Dashboard';
import AdminDashboard from './Dashboards/AdminDashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Transactions from './Dashboards/Dashboard/Transactions/Transactions';
import Exchange from './pages/Exchange/Exchange';
import Prices from './pages/Prices/Prices';
import Profile from './pages/Profile/Profile';
import NotVerified from './Dashboards/NotVerified/NotVerified';
import KYCForm from './Dashboards/KYCForm/KYCForm';
import Pending from './Dashboards/Pending/Pending';
import VerifyEmail from './Dashboards/VerifyEmail/VerifyEmail';

function App() {
  const isDashboard = window.location.pathname === '/dashboard';

  return (
    <Router>
      <ScrollToTop />
      <div  className={`${styles.App} ${isDashboard ? styles.dashboard : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learn-more-1" element={<Blog1 />} />
          <Route path="/learn-more-2" element={<Blog2 />} />
          <Route path="/learn-more-3" element={<Blog3 />} />
          <Route path="/contactus" element={<ContactUsNow />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/activities" element={<Transactions />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

<Route
            path="/not-verified"
            element={
              <ProtectedRoute requiredRole="notverified">
                <NotVerified />
              </ProtectedRoute>
            }
          />
<Route
            path="/kyc-verification"
            element={
              <ProtectedRoute requiredRole="emailverified">
                <KYCForm />
              </ProtectedRoute>
            }
          />

<Route
            path="/pending"
            element={
              <ProtectedRoute requiredRole="pending">
                <Pending />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
