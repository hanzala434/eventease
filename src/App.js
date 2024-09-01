// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import VendorCategory from './VendorCategory';
import Navbar from './Navbar';
import VendorDecor from './VendorDecor';
import VendorProfile from './VendorProfile';
import BookYourEvent from './BookYourEvent';
import ThankYou from './ThankYou';


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/vendor_category" element={<VendorCategory />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/vendors" element={<VendorDecor />} />
        <Route path="/vendors/:id" element={<VendorProfile/>} />
        <Route path="/bookings/:vendorId" element={<BookYourEvent/>} />
        <Route path="/thanku" element={<ThankYou/>} />


        
        {/* Define other routes here */}
        <Route path="*" element={<HomePage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
