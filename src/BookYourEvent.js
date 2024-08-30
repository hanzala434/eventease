import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import './css/BookYourEvent.css';

const BookYourEvent = () => {
  const { vendorId, vendorName } = useParams(); // Get the vendorId and vendorName from the URL parameters
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    eventDate: '',  // New field for event date
    eventTime: '',
    eventType: '',
    additionalInfo: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.eventDate || !formData.eventTime || !formData.eventType) {
      setError('Please fill in all required fields.');
      return;
    }
    
    try {
      const response = await fetch(`http://192.168.100.10:5000/api/bookings/${vendorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, vendorId, vendorName }) // Include vendorName in the request body
      });

      if (response.ok) {
        navigate('/thanku');
      } else {
        setError('Failed to submit your booking. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="book-your-event-container">
      <h2>Get an Appointment</h2> {/* Display vendor name */}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Contact:</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

        <label>Event Date:</label> {/* New date field */}
        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />

        <label>Event Time:</label>
        <select name="eventTime" value={formData.eventTime} onChange={handleChange} required>
          <option value="">Select Time</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
        </select>

        <label>Event Type:</label>
        <select name="eventType" value={formData.eventType} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Wedding">Wedding</option>
          <option value="Corporate">Corporate</option>
          <option value="Birthday">Birthday</option>
          <option value="Others">Others</option>
        </select>

        {formData.eventType === 'Others' && (
          <input
            type="text"
            name="additionalInfo"
            placeholder="Please specify the event type"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        )}

        <label>Add Additional Info:</label>
        <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />

        <button type="submit" className="book-event-button">Book an Appointment</button>
      </form>
    </div>
  );
};

export default BookYourEvent;
