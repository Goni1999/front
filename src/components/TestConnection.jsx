import React, { useEffect, useState } from 'react';

const TestConnection = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://vercel-deploy-server-eight.vercel.app/api/index'; // Add the CORS proxy

    const testConnection = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',  // Added this header
          },
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message); // Message from the backend
        } else {
          setError('Server returned an error');
        }
      } catch (err) {
        setError('Failed to connect to the server');
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return <p>{message}</p>;
};

export default TestConnection;
