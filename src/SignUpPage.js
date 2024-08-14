import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux'; // Uncomment if needed
import './SignUpPage.css';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const dispatch = useDispatch(); // Uncomment if needed

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/signin');
      } else {
        // Handle server-side errors
        alert(data.message || 'Sign up failed');
      }
    } catch (error) {
      // Handle client-side or network errors
      console.error('Sign up failed:', error);
      alert('Sign up failed due to a network or client-side error');
    }
  };
  
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Submit</button>
      </div>
    </div>
  );
};

export default SignUpPage;
