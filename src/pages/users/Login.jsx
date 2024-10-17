import React, { useState } from 'react';
import './Login.css';
import Logo from "../../assets/logo_torigallo.png";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  // Manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que el formulario recargue la página

    // Simular inicio de sesión exitoso sin necesidad de credenciales
    setErrorMessage(''); // Limpiar mensajes de error
    navigate('/principal'); // Redirigir a la página principal
  };

  return (
    <div className='body-login'>
      <div className="login-container">
        <div className="login-box">
          <img src={Logo} alt="Logo" className='logo' />
          <h1>Iniciar Sesión</h1>
          {/* Usar form en lugar de div */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo (opcional)"
              // Eliminar valor y onChange para que no se necesiten credenciales
            />
            <input
              type="password"
              placeholder="Contraseña (opcional)"
              // Eliminar valor y onChange para que no se necesiten credenciales
            />
            <button type="submit">Ingresar</button>
          </form>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
