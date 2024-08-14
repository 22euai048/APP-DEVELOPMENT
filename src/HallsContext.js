import React, { createContext, useContext, useState, useEffect } from 'react';

const HallsContext = createContext();

export const HallsProvider = ({ children }) => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/bookings/');
        const data = await response.json();
        setHalls(data);
      } catch (error) {
        console.error('Error fetching halls:', error);
      }
    };

    fetchHalls();
  }, []);

  return (
    <HallsContext.Provider value={{ halls, setHalls }}>
      {children}
    </HallsContext.Provider>
  );
};

export const useHalls = () => {
  return useContext(HallsContext);
};
