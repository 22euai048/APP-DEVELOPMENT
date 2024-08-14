import React from 'react';
import { useLocation } from 'react-router-dom';
import './ThankYouPage.css';

const ThankYouPage = () => {
  const location = useLocation();
  
  // Use optional chaining to prevent errors if the data is undefined
  const { hall, name, age, gender, paymentMethod } = location.state || {};

  // Conditional rendering in case data is not available
  return (
    <div className="thank-you-container">
      <h2>Thank You for Booking</h2>
      <img
        src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU="
        alt="Booking Confirmation"
      />
      <div className="user-info">
        <p><strong>Name:</strong> {name || 'N/A'}</p>
        <p><strong>Age:</strong> {age || 'N/A'}</p>
        <p><strong>Gender:</strong> {gender || 'N/A'}</p>
        <p><strong>Payment Method:</strong> {paymentMethod || 'N/A'}</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
