import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    address: '',
    phone: '',
    gender: '',
  });
  
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('a capital letter');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('a symbol');
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      
      if (name === 'password') {
        const errors = validatePassword(value);
        setPasswordError(errors.length > 0 ? `Password must contain ${errors.join(', ')}` : '');
      }
      
      if (name === 'confirmPassword') {
        setConfirmPasswordError(value !== newFormData.password ? 'Passwords do not match' : '');
      }
  
      return newFormData;
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.birthday || !formData.address || !formData.phone || !formData.gender) {
      setFormError('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    if (passwordError || confirmPasswordError) {
        alert('Please resolve password issues before signing up.');
        return;
    }

    try {
        const registerResponse = await axios.post('https://server.capital-trust.eu/auth/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            birthday: formData.birthday,
            address: formData.address,
            phone: formData.phone,
            gender: formData.gender,
        });

        const { userId, email, verification_token, nextStep } = registerResponse.data;

        // Now call the send verification email API
        const emailResponse = await axios.post('https://server.capital-trust.eu/auth/send-verification-email', {
            userId: userId,
            email: formData.email,
            verification_token: verification_token, // Get the token from response
        });

        if (emailResponse.status === 200) {
            alert('Registration successful! Please check your email to verify your account.');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } else {
            // Handle the case where email sending failed
            alert('We encountered an issue while sending your verification email. Please try again.');
            console.error('Email sending failed:', emailResponse.data.error);
        }

    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Signup failed. Please try again.';
        alert(errorMessage);
    }
};


  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit}>
        <div className="signup-logo">
          <img src="images/Logo.png" alt="logo" />
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
        
        <input
          type="date"
          name="birthday"
          placeholder="Birthday"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        
        <div>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {formError && <p className="error-message">{formError}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
