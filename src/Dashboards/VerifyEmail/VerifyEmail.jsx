import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Extract token from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); // Get the token from the query
    console.log(token);
  useEffect(() => {
    if (!token) {
      setError('No token provided');
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        // Send the token to the backend for verification
        const response = await axios.post('https://server.capital-trust.eu/auth/verify-email', { token });
        
        if (response.data.success) {
          setMessage('Your email has been successfully verified!');
          setTimeout(() => {
            navigate('/kyc-verification');
          }, 3000);
        } else {
          setError('Email verification failed. Please try again.');
        }
      } catch (err) {
        setError('An error occurred while verifying the email. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
