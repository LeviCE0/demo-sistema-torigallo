import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import Login from '../pages/users/Login';
import Principal from '../pages/Principal';
import Reservas from '../pages/GestionReservas';
import GestionMesas from '../pages/GestionMesas';
import GestionAtencion from '../pages/GestionAtencion';
import Historial from '../pages/Historial';
import ProtectedLayout from '../components/ProtectedLayout';
import Pedido from '../pages/Pedidos';

// Ruta protegida
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute element={<ProtectedLayout />} />}>
        <Route path="/principal" element={<Principal />} />
        <Route path="/gestionMesas" element={<GestionMesas />} />
        <Route path="/gestionReservas" element={<Reservas />} />
        <Route path="/gestionAtencion" element={<GestionAtencion />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/pedido/:id" element={<Pedido />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
