import React from 'react';
import TestConnection from './components/TestConnection';  // Import the TestConnection component

const App = () => {
  return (
    <div>
      <h1>Test Backend Connection</h1>
      <TestConnection />  {/* Render the TestConnection component */}
    </div>
  );
};

export default App;
