import React from 'react';
import '../styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-circle"></div>
      <p className="loading-text">Cargando<span className="dots">...</span></p>
    </div>
  );
};

export default Loading;
