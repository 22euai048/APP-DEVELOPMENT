import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    payment_method: '',
    amount: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    const { name, age, gender, payment_method, amount } = formData;

    if (!name || !age || !gender || !payment_method || !amount) {
      alert('Please fill in all required fields.');
      return;
    }

    const bookingDetails = { name, age, gender, payment_method, amount };

    try {
      const response = await fetch('http://localhost:8000/api/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        navigate('/thank-you', { state: bookingDetails });
      } else {
        alert('Failed to save booking details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving booking details');
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <select name="payment_method" value={formData.payment_method} onChange={handleChange}>
        <option value="">Select Payment Method</option>
        <option value="Card">Card</option>
        <option value="GPay">GPay</option>
      </select>
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <button onClick={handlePayment}>Proceed to Pay</button>
    </div>
  );
};

export default PaymentPage;
