import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './css/VendorProfile.css';

const VendorProfile = () => {
  const { id } = useParams(); // Get the vendor id from the URL
  const [vendorProfile, setVendorProfile] = useState(null);
  const navigate = useNavigate(); // Get the navigate function for navigation

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const response = await fetch(`http://192.168.100.10:5000/api/vendors/${id}`);
        const data = await response.json();
        setVendorProfile(data);
      } catch (error) {
        console.error('Error fetching vendor profile:', error);
      }
    };

    fetchVendorProfile();
  }, [id]);

  if (!vendorProfile) {
    return <div>Loading...</div>;
  }

  // Ensure trendingServices and allServices have default values if undefined
  const trendingServices = vendorProfile.trendingServices || [];
  const allServices = vendorProfile.allServices || [];

  // Handle the "Book an Event" button click
  const handleBookEvent = () => {
    navigate(`/bookings/${id}`);
  };

  return (
    <div className="vendor-profile-container">
      <div className="vendor-profile-header">
        <h1 className="vendor-name">{vendorProfile.name}</h1>
        <p className="vendor-category">{vendorProfile.categoryName}</p>
      </div>

      <div className="trending-section">
        <h2>Trending Services</h2>
        <div className="services-grid">
          {trendingServices.length > 0 ? (
            trendingServices.map((service, index) => (
              <div key={index} className="service-item">
                <img src={service.image} alt={service.name} className="service-image" />
                <p className="service-name">{service.name}</p>
              </div>
            ))
          ) : (
            <p>No trending services available.</p>
          )}
        </div>
        <button 
          className="book-event-button" 
          aria-label="Book an event with this vendor"
          onClick={handleBookEvent} // Set the button to trigger the navigation
        >
          Book an Event
        </button>
      </div>

      <div className="all-services-section">
        <h2>All Services</h2>
        <div className="services-grid">
          {allServices.length > 0 ? (
            allServices.map((service, index) => (
              <div key={index} className="service-item">
                <img src={service.image} alt={service.name} className="service-image" />
                <p className="service-name">{service.name}</p>
                <p className="service-price">Estimated Price: Rs {service.estimatedPrice}</p>
              </div>
            ))
          ) : (
            <p>No services available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
