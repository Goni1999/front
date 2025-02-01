import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.scss';

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
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
        setFormData({ ...formData, [name]: value });

        if (name === 'password') {
            const errors = validatePassword(value);
            setPasswordError(errors.length > 0 ? `Password must contain ${errors.join(', ')}` : '');
        }

        if (name === 'confirmPassword') {
            setConfirmPasswordError(value !== formData.password ? 'Passwords do not match' : '');
        }
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordError || confirmPasswordError) {
            alert('Please resolve password issues before signing up.');
            return;
        }

        try {
            // ✅ Register user
            const registerResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            alert(registerResponse.data.message);

            // ✅ Automatically log in the user after registration
            const loginResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
                email: formData.email,
                password: formData.password,
            });

            const { user, token } = loginResponse.data;

            // ✅ Store token & user data
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('token', token);
            storage.setItem('user', JSON.stringify(user));

            console.log("✅ Token Saved:", token);
            console.log("✅ User Logged In:", user);

            // ✅ Redirect user based on role
            navigate(user.role === 'admin' ? '/admin-dashboard' : '/dashboard');
        } catch (error) {
            console.error('❌ Sign-up error:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'An error occurred during sign-up');
        }
    };

    return (
        <div className="signup-page">
            <form onSubmit={handleSubmit}>
                <div className="signup-logo">
                    <img src="images/Logo.png" alt="logo" />
                </div>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                {passwordError && <p className="error-message">{passwordError}</p>}
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                <div className="signup-links">
                    <label className="remember-me">
                        <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                        Remember me
                    </label>
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
