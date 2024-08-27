import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon
import { Link } from 'react-router-dom'; // For navigation

const Navbar = () => {
  // Retrieve the stored email
  const email = localStorage.getItem('userEmail');
  
  // Extract the part before '@' as the username
  const username = email ? email.split('@')[0] : 'Guest';

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#800000', // Maroon color
      color: 'white',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    profile: {
      display: 'flex',
      alignItems: 'center',
    },
    profileName: {
      marginRight: '35px',
    },
    icon: {
      fontSize: '24px',
      marginRight: '35px',
    },
  };

  return (
    <div style={styles.navbar}>
      <Link to="./HomePage" style={{ textDecoration: 'none', color: 'white' }}>
        <div style={styles.title}>EventEase</div>
      </Link>
      <div style={styles.profile}>
        <div style={styles.profileName}>{username}</div> {/* Display the extracted username */}
        <FaUserCircle style={styles.icon} />
      </div>
    </div>
  );
};

export default Navbar;
