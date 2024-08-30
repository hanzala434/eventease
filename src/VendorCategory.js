// src/VendorCategory.js
import React from 'react';
import { FaCamera, FaMapMarkerAlt, FaVolumeUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './css/Vendor_Category.css'; // Import the CSS file
import { GiSofa } from "react-icons/gi";


const VendorCategory = () => {
  return (
    <div className="container">
      <Link to="/vendors" className="link">
        <div className="category">
          <GiSofa className="icon" />
          <h2 className="heading">Decor</h2>
        </div>
      </Link>

      <Link to="/photography" className="link">
        <div className="category">
          <FaCamera className="icon" />
          <h2 className="heading">Photography</h2>
        </div>
      </Link>

      <Link to="/venue" className="link">
        <div className="category">
          <FaMapMarkerAlt className="icon" />
          <h2 className="heading">Venue</h2>
        </div>
      </Link>

      <Link to="/others" className="link">
        <div className="category">
          <FaVolumeUp className="icon" />
          <h2 className="heading">Others</h2>
        </div>
      </Link>
    </div>
  );
};

export default VendorCategory;
