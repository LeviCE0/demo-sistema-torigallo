// src/components/Modal.js
import React from 'react';
import '../styles/Modal.css';

function Modal({ message, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
