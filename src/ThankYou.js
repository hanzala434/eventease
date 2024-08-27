// src/components/ThankYou.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/ThankYou.css'; // Add appropriate styling

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <h2>Thank You!</h2>
      <p>Your appointment has been sent. The vendor will contact you via WhatsApp. Kindly check your inbox in a while.</p>
      <Link to="/" className="back-home-button">Back to Home</Link>
    </div>
  );
};

export default ThankYou;
