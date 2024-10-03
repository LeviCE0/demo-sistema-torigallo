import React, { useState } from 'react';
import '../styles/ModalComentario.css';

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
      <div className="modalComment-content">
        <h3>Cancelar Atención</h3>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribe el motivo de la cancelación"
          maxLength={250}
        />
        <div className='button-container'>
          <button style={{backgroundColor:'green'}} onClick={manejarEnvio}>Enviar</button>
          <button style={{backgroundColor:'red'}} onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalComentario;
