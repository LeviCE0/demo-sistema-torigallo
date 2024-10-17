import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/users/Login';
import Principal from '../pages/Principal';
import Reservas from '../pages/GestionReservas';
import GestionMesas from '../pages/GestionMesas';
import GestionAtencion from '../pages/GestionAtencion';
import Historial from '../pages/Historial';
import Pedido from '../pages/Pedidos';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/principal" element={<Principal />} />
      <Route path="/gestionMesas" element={<GestionMesas />} />
      <Route path="/gestionReservas" element={<Reservas />} />
      <Route path="/gestionAtencion" element={<GestionAtencion />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="/pedido/:id" element={<Pedido />} />
    </Routes>
  );
}

export default AppRoutes;
