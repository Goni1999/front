import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './KYCForm.scss'

const KYCForm = () => {
  const [selectedIdType, setSelectedIdType] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [files, setFiles] = useState({
    frontId: null,
    backId: null,
    passportId: null,
    driversLicenseId: null,
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles(prevFiles => ({ ...prevFiles, [name]: files[0] }));
  };

  const handleIdTypeChange = (e) => {
    setSelectedIdType(e.target.value);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'uploads'); // Set this in Cloudinary

    const response = await axios.post('https://api.cloudinary.com/v1_1/dqysonzsh/upload', formData);
    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedUrls = [];
      
      // Upload each file to Cloudinary and store the URLs
      for (let field in files) {
        if (files[field]) {
          const url = await uploadToCloudinary(files[field]);
          uploadedUrls.push(url);
        }
      }

      // Fetch the token from localStorage or sessionStorage
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      // Send the URLs to the backend to save and send the email
      const response = await axios.post(
        'https://server.capital-trust.eu/auth/save-kyc',
        { urls: uploadedUrls }, // Send only the URLs to the backend
        { headers }
      );
        alert('KYC Verification Submitted Successfully');
        setTimeout(() => {
          navigate('/pending');
        }, 3000);
      
      
    } catch (error) {
      console.error('Error during file upload:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kyc-form-container">

      {/* Instructions for taking a proper photo */}
      <div className="photo-instructions">
      <h2>Upload Your KYC Documents</h2>
        <br/>
        <h3>How to take your photo with ID in hand:</h3>
        <ul>
          <li>Ensure your ID is clearly visible and readable.</li>
          <li>Hold the ID in your hand and keep it steady.</li>
          <li>Make sure your face is visible and clearly in the frame.</li>
          <li>Ensure proper lighting; avoid shadows over the ID.</li>
        </ul>
        <div className="photo-example">
          <img 
            src="https://images.prismic.io/veriff/ZrnjlEaF0TcGI210_24-biometric-auth-buyers-guide-report-cover.png?auto=format,compress&rect=0,0,3840,2160&w=1920&h=1080" 
            alt="Example of how to take a photo with ID" 
          />
          <p>Example: A clear photo showing your ID and face together.</p>
        </div>
      </div>

      {/* KYC form */}
      <form className='kyc-form' onSubmit={handleSubmit}>
        <select className='select-input' value={selectedIdType} onChange={handleIdTypeChange} required>
          <option value="">Select ID Type</option>
          <option value="idCard">ID Card</option>
          <option value="passport">Passport</option>
          <option value="driversLicense">Driver's License</option>
        </select>

        {selectedIdType === 'idCard' && (
          <>
            <input type="file" name="frontId" onChange={handleFileChange} required />
            <input type="file" name="backId" onChange={handleFileChange} required />
          </>
        )}
        
        {selectedIdType === 'passport' && (
          <input type="file" name="passportId" onChange={handleFileChange} required />
        )}
        
        {selectedIdType === 'driversLicense' && (
          <input className='file-input' type="file" name="driversLicenseId" onChange={handleFileChange} required />
        )}

        <button type="submit" className='submit-btn' disabled={loading}>
          {loading ? 'Uploading...' : 'Submit KYC'}
        </button>
      </form>
    </div>
  );
};

export default KYCForm;
