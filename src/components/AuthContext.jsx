import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expirationTime = localStorage.getItem('authTokenExpiration');
    
    if (token && expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        logout();
      } else {
        const timeLeft = expirationTime - currentTime;
        setIsAuthenticated(true);
        navigate('/principal');

        const timer = setTimeout(() => {
          logout();
        }, timeLeft);

        return () => clearTimeout(timer);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token) => {
    const expirationTime = new Date().getTime() + 10800000;
    localStorage.setItem('authToken', token);
    localStorage.setItem('authTokenExpiration', expirationTime);
    setIsAuthenticated(true);
    navigate('/principal');

    setTimeout(() => {
      logout();
    }, 10800000);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiration');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
