import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LogIn.scss';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send login request to the backend API
      const response = await axios.post(
        'https://server.capital-trust.eu/auth/login', // Make sure this URL is correct
        formData,
        {
          validateStatus: (status) => status < 18000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("🔍 Login Response:", response.data); // ✅ Debugging log

      if (!response.data || !response.data.user || !response.data.token) {
        throw new Error('❌ No token received from server');
      }

      const { user, token } = response.data;

      console.log("✅ Received Token:", token);  // ✅ Debugging log

      if (!user.email) throw new Error('User data is missing');

      const normalizedUser = {
        ...user,
        role: user.role?.toLowerCase().trim() || 'user',
        verified: user.verified // Assuming user object has 'verified' field
      };

      // ✅ Always store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));

      console.log("✅ Token Saved in LocalStorage:", localStorage.getItem('token')); // ✅ Debugging log
      console.log("✅ User Data Saved:", localStorage.getItem('user'));

      // Navigate based on user role and verification status
      if (normalizedUser.role === 'admin') {
        navigate('/admin-dashboard'); // Redirect to admin dashboard if the user is admin
      } else if (normalizedUser.role === 'notverified') {
        navigate('/not-verified'); // Redirect to a waiting page if the user is not verified
      } else if (normalizedUser.role === 'user') {
        navigate('/dashboard'); // Redirect to user dashboard if the user is verified
      } else if (normalizedUser.role === 'emailverified') {
        navigate('/kyc-verification'); // Redirect to user dashboard if the user is verified
      } else if (normalizedUser.role === 'pending') {
        navigate('/pending'); // Redirect to user dashboard if the user is verified
      }

    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <div className="login-logo">
          <img src="images/Logo.png" alt="logo" />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
