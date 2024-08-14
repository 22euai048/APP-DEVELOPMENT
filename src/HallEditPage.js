import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './HallEditPage.css'
const HallEditPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [hallData, setHallData] = useState({
    name: '',
    dimensions: '',
    square_feet: '',
    rate: '',
    accommodation: '',
    features: '',
    image: '' // Updated to store the image URL
  });

  // Fetch hall data when the component mounts or when the ID changes
  useEffect(() => {
    const fetchHall = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/halls/${id}/`);
        if (response.ok) {
          const data = await response.json();
          setHallData(data);
        } else {
          console.error('Failed to fetch hall data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching hall data:', error);
      }
    };

    // If hall data is passed via location state, use it; otherwise, fetch from the API
    if (location.state && location.state.hall) {
      setHallData(location.state.hall);
    } else {
      fetchHall();
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHallData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: hallData.name,
      dimensions: hallData.dimensions,
      square_feet: hallData.square_feet,
      rate: hallData.rate,
      accommodation: hallData.accommodation,
      features: hallData.features,
      image: hallData.imageUrl // Send the image URL instead of a file
    };

    try {
      const response = await fetch(`http://localhost:8000/api/halls/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert('Hall updated successfully!');
        navigate('/available-halls');
      } else {
        const errorData = await response.json();
        console.error('Failed to update hall:', errorData);
        alert(`Failed to update hall: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating hall:', error);
      alert('Error updating hall, please try again later.');
    }
  };

  return (
    <div className="hall-edit-page">
      <h2>Edit Hall</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hall Name:</label>
          <input type="text" name="name" value={hallData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Dimensions:</label>
          <input type="text" name="dimensions" value={hallData.dimensions} onChange={handleChange} required />
        </div>
        <div>
          <label>Square Feet:</label>
          <input type="number" name="square_feet" value={hallData.square_feet} onChange={handleChange} required />
        </div>
        <div>
          <label>Rate:</label>
          <input type="number" name="rate" value={hallData.rate} onChange={handleChange} required />
        </div>
        <div>
          <label>Accommodation:</label>
          <input type="text" name="accommodation" value={hallData.accommodation} onChange={handleChange} required />
        </div>
        <div>
          <label>Features:</label>
          <textarea name="features" value={hallData.features} onChange={handleChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="text" name="imageUrl" value={hallData.imageUrl} onChange={handleChange} required />
        </div>
        <button type="submit">Update Hall</button>
      </form>
    </div>
  );
};

export default HallEditPage;
