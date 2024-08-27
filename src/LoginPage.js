// src/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/LoginPage.css';
import logo from './eventease_logo.png'; // Make sure to place your logo image in the 'src' folder

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('userEmail', email); // Store the email
        navigate('/home');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Email or Password is incorrect');
    }
  };
  

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <img src={logo} alt="EventEase Logo" className="logo" />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button onClick={handleLogin} className="button">Sign In</button>
      <button onClick={handleSignUp} className="button buttonSecondary">Sign Up</button>
    </div>
  );
};

export default LoginPage;
