import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [editedUsers, setEditedUsers] = useState({});
  const [initialState, setInitialState] = useState({});

  const fetchAllData = async () => {
    try {
      const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!storedToken) {
        console.error("🚨 No token found! Login again.");
        return;
      }
  
  
      const headers = {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json',  // Ensure this is set to JSON
      };
  
      const [usersRes, reportsRes, investmentsRes, enquiriesRes] = await Promise.all([
        axios.get('https://server.capital-trust.eu/api/users', { headers }),
        axios.get('https://server.capital-trust.eu/api/reports', { headers }),
        axios.get('https://server.capital-trust.eu/api/investments', { headers }),
        axios.get('https://server.capital-trust.eu/api/contact', { headers }),
      ]);
  
      // Ensure that the usersRes.data has the expected structure, including the crypto values.
  
      setUsers(usersRes.data);
      setReports(reportsRes.data.data);
      setInvestments(investmentsRes.data.data);
      setEnquiries(enquiriesRes.data.data);
  
      // Initialize editable state
      const initialEdits = {};
      usersRes.data.forEach(user => {
        initialEdits[user.id] = { ...user };
      });
      setEditedUsers(initialEdits);
      setInitialState(initialEdits);

    } catch (error) {
      console.error(' Error:', error.response?.data || error.message);
    }
  };
  

  // Auto-fetch data on mount and every 60 seconds
  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 60000); // 60 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleEditChange = (userId, field, value) => {
    // Parse the value if it's not empty or else set it to 0
    const parsedValue = value !== "" ? parseFloat(value) : 0;

    setEditedUsers((prevState) => {
      const updatedUser = { ...prevState[userId], [field]: parsedValue };
      return {
        ...prevState,
        [userId]: updatedUser,
      };
    });
  };

  const checkForChanges = () => {
    const usersToUpdate = users.map(user => {
      const updatedUser = editedUsers[user.id];
      const initialUser = initialState[user.id];

      const updatedBalances = {};

      // Only send changed fields to the backend
      ['btc', 'eth', 'ada', 'xrp', 'doge', 'bnb', 'sol', 'dot'].forEach(field => {
        // If the value has changed, update the balances object
        if (updatedUser[field] !== initialUser[field]) {
          updatedBalances[field.toUpperCase()] = updatedUser[field];
        }
      });

      // If no fields changed, we don't need to send the user at all (preserving old values)
      if (Object.keys(updatedBalances).length === 0) {
        return null; // Don't send this user if no fields are changed
      }

      // Otherwise, return the user data with the updated balances
      return {
        userId: user.id,
        balances: updatedBalances,
        total: updatedUser.total, // Ensure total is sent along with updated balances
      };
    });

    // Remove any null values from the array (users with no changes)
    return usersToUpdate.filter(user => user !== null);
  };

  const updateUsersData = async () => {
    try {
      const usersToUpdate = checkForChanges();

      if (usersToUpdate.length === 0) {
        alert('No changes detected. Please edit a field before saving.');
        return;
      }

      const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = { Authorization: `Bearer ${storedToken}` };

      const response = await axios.post(
        'https://server.capital-trust.eu/api/update-balances',
        { users: usersToUpdate },
        { headers }
      );

      if (response.status === 200) {
        alert('User balances updated successfully!');
        fetchAllData();  // Refresh the data after update
      } else {
        alert('Failed to update user balances.');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Error updating user balances. Please try again later.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Users Table */}
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th><th>Name</th><th>Email</th><th>Role</th>
            <th>BTC</th><th>ETH</th><th>ADA</th><th>XRP</th><th>DOGE</th><th>BNB</th><th>SOL</th><th>DOT</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
              {['btc', 'eth', 'ada', 'xrp', 'doge', 'bnb', 'sol', 'dot'].map(field => (
                <td key={field}>
                  <input
                    type="text"
                    value={editedUsers[user.id]?.[field] || user[field] || 0}
                    onChange={(e) => handleEditChange(user.id, field, e.target.value)}
                  />
                </td>
              ))}
              <td>
                <button onClick={updateUsersData}>Save</button>
              </td>
            </tr>
          )) : <tr><td colSpan="14" className="no-data">No users found</td></tr>}
        </tbody>
      </table>

      {/* Reports Table */}
      <h2>Reports</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Surname</th><th>Email</th><th>Description</th><th>Created At</th></tr>
        </thead>
        <tbody>
          {reports.length > 0 ? reports.map((report) => (
            <tr key={report.id}>
              <td>{report.name}</td><td>{report.surname}</td><td>{report.email}</td><td>{report.description}</td><td>{report.created_at}</td>
            </tr>
          )) : <tr><td colSpan="5" className="no-data">No reports found</td></tr>}
        </tbody>
      </table>

      {/* Investments Table */}
      <h2>Investments</h2>
      <table>
        <thead>
          <tr><th>Investor</th><th>Email</th><th>Phone Number</th><th>Amount</th><th>Details</th><th>Created at</th></tr>
        </thead>
        <tbody>
          {investments.length > 0 ? investments.map((investment) => (
            <tr key={investment.id}>
              <td>{investment.first_name} {investment.last_name}</td>
              <td>{investment.email}</td><td>{investment.phone_country_code} {investment.phone_number}</td><td>${investment.investment_amount}</td><td>{investment.details}</td><td>{investment.created_at}</td>
            </tr>
          )) : <tr><td colSpan="6" className="no-data">No investments found</td></tr>}
        </tbody>
      </table>

      {/* Contact Enquiries Table */}
      <h2>Contact Enquiries</h2>
      <table>
        <thead>
          <tr><th>Type</th><th>Full Name</th><th>Email</th><th>Message</th><th>Phone</th><th>Country</th><th>Scam Website</th><th>Lost Money</th><th>Created At</th></tr>
        </thead>
        <tbody>
          {enquiries.length > 0 ? enquiries.map((enquiry) => (
            <tr key={enquiry.id}>
              <td>{enquiry.enquirytype}</td><td>{enquiry.fullname}</td><td>{enquiry.email}</td><td>{enquiry.message}</td><td>{enquiry.phone}</td><td>{enquiry.country}</td><td>{enquiry.scamwebsite}</td><td>{enquiry.lostmoney}</td><td>{enquiry.created_at}</td>
            </tr>
          )) : <tr><td colSpan="9" className="no-data">No enquiries found</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;