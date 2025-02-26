// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import url from '../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      setToken(storedToken);

      try {
        const response = await fetch(url + 'user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserDetails(userData);
        } else {
          console.error('Failed to fetch user details:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, loading, error, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};