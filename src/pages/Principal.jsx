import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir si no está autenticado
import { AuthContext } from '../components/AuthContext';
import '../styles/Principal.css';

function Principal() {
  const { isAuthenticated } = useContext(AuthContext); // Obtenemos el estado de autenticación
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir al login
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    isAuthenticated && (
      <div className="principal-container">
        <h1>Bienvenido al Sistema de Gestión de Torigallo</h1>
      </div>
    )
  );
}

export default Principal;
