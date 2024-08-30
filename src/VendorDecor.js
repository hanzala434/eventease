// src/components/VendorList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/VendorDecor.css'; // Import the CSS file

const VendorDecor = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://192.168.100.10:5000/api/vendors');
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="vendor-container">                            
      {vendors.map((vendor) => (
        <Link to={`/vendors/${vendor._id}`} key={vendor._id} className="vendor-link">
          <div className="vendor-section">
            <img src={vendor.profilePic} alt={vendor.name} className="vendor-profile-pic" />
            <h2 className="vendor-name">{vendor.name}</h2>
            <p className="vendor-category">{vendor.categoryName}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VendorDecor;
