import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';

function Card_Mesa({ id, title, description, status, onCancel }) {
  const navigate = useNavigate();

  const handleAtender = () => {
    navigate(`/pedido/${id}`);
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <p><strong>Capacidad: </strong>{description}</p>
      <div className="status-container">
        <p style={{ display: 'inline' }}><strong>Estado:</strong> {status}</p>
        {status === 'Disponible' ? (
          <button className="btn-atender" onClick={handleAtender}>
            Atender
          </button>
        ) : status === 'Atendido' ? (
          <button 
            className="btn-cancelar-atencion" 
            onClick={onCancel}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Cancelar Atención
          </button>
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold' }}>No se puede atender</p>
        )}
      </div>
    </div>
  );
}

export default Card_Mesa;
