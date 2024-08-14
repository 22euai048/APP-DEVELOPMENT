import React, { useEffect, useState } from 'react';
import './BookingHistoryPage.css';

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/bookings/');
        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.statusText}`);
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-history-container">
      <h2>Booking History</h2>
      {error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Age:</strong> {booking.age}</p>
              <p><strong>Gender:</strong> {booking.gender}</p>
              <p><strong>Payment Method:</strong> {booking.payment_method}</p>
              <p><strong>Amount:</strong> {booking.amount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistoryPage;
