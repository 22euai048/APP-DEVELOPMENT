import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import AvailableHallsPage from './AvailableHallsPage';
import PaymentPage from './PaymentPage';
import ThankYouPage from './ThankYouPage';
import BookingHistoryPage from './BookingHistoryPage';
import AdminLoginPage from './AdminLoginPage';
import AdminPage from './AdminPage';
import { HallsProvider } from './HallsContext';
import Footer from './Footer';
import HallEditPage from './HallEditPage';


const App = () => {
  return (
    <HallsProvider>
      <Router>
      <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/available-halls" element={<AvailableHallsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/admin/:id" element={<HallEditPage />} />
        <Route path="/booking-history" element={<BookingHistoryPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        
      </Routes>
      <Footer/>
      </div>
     
    </Router>
    </HallsProvider>
  );
};

export default App;
