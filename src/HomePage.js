import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="navbar">
        <Link to="/signin">
          <button className="nav-button">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="nav-button">Sign Up</button>
        </Link>
        <Link to="/available-halls">
          <button className="nav-button">Available Halls</button>
        </Link>
        <Link to="/booking-history">
          <button className="nav-button">Booking History</button>
        </Link>
        <Link to="/admin-login">
          <button className="nav-button">Admin</button>
        </Link>
      </div>
      <h1>Welcome to the Wedding Hall Booking Website</h1>
    </div>
  );
};

export default HomePage;
