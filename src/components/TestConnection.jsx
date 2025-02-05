import React, { useEffect, useState } from 'react';

const TestConnection = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Correct API URL for the /status route from Vercel
    const apiUrl = 'https://vercel-deploy-server-p4qpaq0e3-goni-gonis-projects.vercel.app/api/status';

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
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return <p>{message}</p>;
};

export default TestConnection;
