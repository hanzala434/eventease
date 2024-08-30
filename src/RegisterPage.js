import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/RegisterPage.css'; // Create this CSS file for styling

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://192.168.100.10:5000/api/register', { email, password });
      if (response.data.success) {
        navigate('/LoginPage');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input"
      />
      <button onClick={handleRegister} className="button">Register</button>
    </div>
  );
};

export default RegisterPage;
