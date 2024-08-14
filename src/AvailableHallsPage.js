import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AvailableHallsPage.css';

const AvailableHallsPage = () => {
  const [halls, setHalls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/halls/');
        const data = await response.json();
        setHalls(data);
      } catch (error) {
        console.error('Error fetching halls:', error);
      }
    };

    fetchHalls();
  }, []);

  const handleBookNow = (hall) => {
    navigate('/payment', { state: { hall } });
  };

  const handleEdit = (hall) => {
    navigate(`/admin/${hall.id}`, { state: { hall } });
  };

  const handleDelete = async (hall) => {
    try {
      const response = await fetch(`http://localhost:8000/api/halls/${hall.id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setHalls((prevHalls) => prevHalls.filter((h) => h.id !== hall.id));
      } else {
        console.error('Failed to delete hall');
      }
    } catch (error) {
      console.error('Error deleting hall:', error);
    }
  };

  return (
    <div className="available-halls-page">
      <div className="sidebar">
        <h2>Available Halls</h2>
        <ul>
          {halls.map((hall) => (
            <li key={hall.id}>
              <a href={`#hall${hall.id}`}>{hall.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="halls-container">
        {halls.map((hall) => (
          <div className="hall-card" id={`hall${hall.id}`} key={hall.id}>
            <img src={hall.image} alt={hall.name} />
            <h3>{hall.name}</h3>
            <p>Dimensions: {hall.dimensions}</p>
            <p>Square Feet: {hall.squareFeet}</p>
            <p>Rate: {hall.rate}</p>
            <p>Accommodation: {hall.accommodation}</p>
            <p>Features: {hall.features}</p>
            <button onClick={() => handleBookNow(hall)}>Book Now</button>
            <button onClick={() => handleEdit(hall)}>Edit</button>
            <button onClick={() => handleDelete(hall)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableHallsPage;
