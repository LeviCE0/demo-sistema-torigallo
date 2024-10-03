// src/components/ProtectedLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MenuSideLeft from './MenuSideLeft'; // Asegúrate de que el path sea correcto

function ProtectedLayout() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenuVisibility = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <div className="protected-layout">
      <MenuSideLeft isVisible={isMenuVisible} toggleMenu={toggleMenuVisibility} />
      <div className={`main-content ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
        <Outlet /> {/* Aquí se renderizan las páginas protegidas */}
      </div>
    </div>
  );
}

export default ProtectedLayout;
