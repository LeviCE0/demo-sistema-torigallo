import React, { useState, useContext } from 'react';
import './Login.css';
import Logo from "../../assets/logo_torigallo.png";
import { AuthContext } from '../../components/AuthContext'; // Importar el AuthContext

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext); // Obtener la función login del contexto

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que el formulario recargue la página

    try {
      const response = await fetch('https://santamariahoteles.com/torigallo/backend/login_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        login(data.token); // Usar la función login para autenticar
      } else {
        setErrorMessage(data.message); // Mostrar mensaje de error si el login falla
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Hubo un problema con el servidor.'); // Mensaje de error para fallos del servidor
    }
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
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Requerido para evitar envíos vacíos
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Requerido para evitar envíos vacíos
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
