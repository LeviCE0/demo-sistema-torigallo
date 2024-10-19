import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/menusideleft.css';
import Logo from "../assets/logo_torigallo.png";
import closeMenuIcon from "../assets/close-menu.png";
import openMenuIcon from "../assets/open-menu.png";

function MenuSideLeft({ isVisible, toggleMenu }) {
  const navigate = useNavigate();

  const handleLogout = () => {

    for (let key in localStorage) {
      if (key.startsWith('pedido_mesa_')) {
        localStorage.removeItem(key);
      }
    }

    navigate('/demo-sistema-torigallo');
    window.location.reload();
  };

  return (
    <>
      <button className={`menu-toggle-button ${isVisible ? 'is-x' : 'is-hamburger'}`} onClick={toggleMenu}>
        <img
          src={isVisible ? closeMenuIcon : openMenuIcon}
          alt={isVisible ? "Cerrar menú" : "Abrir menú"}
          width="24"
          height="24"
        />
      </button>

      <aside className={`menu-side-left ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="logo-head">
          <img src={Logo} alt="Logo" className='logo' />
        </div>
        <nav className="navbar">
          <ul>
            <li><Link to="/principal">Inicio</Link></li>
            <li><Link to="/gestionMesas">Gestión de Mesas</Link></li>
            <li><Link to="/gestionReservas">Gestión de Reservas</Link></li>
            <li><Link to="/gestionAtencion">Gestión de Atenciones</Link></li>
            <li><Link to="/historial">Historial</Link></li>
            <li>
              <a className="logout-button" onClick={handleLogout}>
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default MenuSideLeft;
