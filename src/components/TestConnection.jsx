import React, { useEffect, useState } from 'react';

const TestConnection = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your Vercel backend API URL
    const apiUrl = 'https://vercel-deploy-server-orpin.vercel.app/api/test';  // Change to your Vercel URL

    const testConnection = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);  // Message from the backend (e.g., 'Server is connected')
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
