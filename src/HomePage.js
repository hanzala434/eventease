// src/HomePage.js
import React from 'react';
import { FaMoneyBillWave, FaUserFriends, FaStar} from 'react-icons/fa';
import { GiTheaterCurtains } from "react-icons/gi"
import { Link } from 'react-router-dom';
import './css/HomePage.css'; // Import the CSS file from the css folder

const HomePage = () => {
  return (
    <div className="container">
      <Link to="/vendor_category" className="link">
        <div className="section">
            <GiTheaterCurtains className="icon" />
          <h2 className="heading">Book a Vendor</h2>
          <p className="description">
            Choose from a variety of vendors to make your event extraordinary.
          </p>
        </div>
      </Link>

      <Link to="/budget_set" className="link">
        <div className="section">
          <FaMoneyBillWave className="icon" />
          <h2 className="heading">Set Up Your Budget</h2>
          <p className="description">
            Manage your expenses and stay within budget effortlessly.
          </p>
        </div>
      </Link>

      <Link to="/contact_us" className="link">
        <div className="section">
          <FaUserFriends className="icon" />
          <h2 className="heading">Contact Us</h2>
          <p className="description">
            Get in touch with our support team for any inquiries or help.
          </p>
        </div>
      </Link>

      <Link to="/vendor_reviews" className="link">
        <div className="section">
          <FaStar className="icon" />
          <h2 className="heading">Vendor Reviews</h2>
          <p className="description">
            Read reviews and ratings to select the best vendor for your needs.
          </p>
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
