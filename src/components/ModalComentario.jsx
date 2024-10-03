import React, { useState } from 'react';
import '../styles/Modal.css';

function ModalComentario({ onSubmit, onClose }) {
  const [comentario, setComentario] = useState('');

  const manejarEnvio = () => {
    if (comentario) {
      onSubmit(comentario);
    } else {
      alert('Por favor ingresa un comentario.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Cancelar Atención</h3>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribe el motivo de la cancelación"
        />
        <button onClick={manejarEnvio}>Enviar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ModalComentario;
