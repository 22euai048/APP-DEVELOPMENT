import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHalls } from './HallsContext';
import './AdminPage.css';

const AdminPage = () => {
  const [hallDetails, setHallDetails] = useState({
    name: '',
    image: '',
    dimensions: '',
    square_feet: '', // Ensure this matches the backend field name
    rate: '',
    accommodation: '',
    features: ''
  });
  const { halls, setHalls } = useHalls();
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHallDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleAddHall = async () => {
    const url = 'http://localhost:8000/api/halls/';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hallDetails)
      });
      if (response.ok) {
        const newHall = await response.json();
        setHalls((prevHalls) => [...prevHalls, newHall]);
        setHallDetails({
          name: '',
          image: '',
          dimensions: '',
          square_feet: '', // Ensure this matches the backend field name
          rate: '',
          accommodation: '',
          features: ''
        });
        navigate('/available-halls');
      } else {
        const errorText = await response.text();
        console.error('Failed to add hall:', errorText);
      }
    } catch (error) {
      console.error('Error adding hall:', error);
    }
  };

  return (
    <div className="admin-page-container">
      <h2>Add New Hall</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={hallDetails.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={hallDetails.image}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Dimensions:</label>
        <input
          type="text"
          name="dimensions"
          value={hallDetails.dimensions}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Square Feet:</label>
        <input
          type="text"
          name="square_feet" // Ensure this matches the backend field name
          value={hallDetails.square_feet}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Rate:</label>
        <input
          type="text"
          name="rate"
          value={hallDetails.rate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Accommodation:</label>
        <input
          type="text"
          name="accommodation"
          value={hallDetails.accommodation}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Features:</label>
        <input
          type="text"
          name="features"
          value={hallDetails.features}
          onChange={handleChange}
          required
        />
      </div>
      <button onClick={handleAddHall}>Add Hall</button>
    </div>
  );
};

export default AdminPage;
