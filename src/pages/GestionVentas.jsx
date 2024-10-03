import React from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import '../styles/GestionVentas.css';

function GestionVentas() {

  return (
    <div className="ventas-container">
      <h2>Gestión de Ventas</h2>
      <p>Este es el módulo donde puedes gestionar las ventas del restaurante.</p>

      <div className="charts-container">
        <div className="chart">
          <h3>Ventas del Mes (Gráfico de Barras)</h3>
          <BarChart />
        </div>
        <div className="chart">
          <h3>Cantidad de Clientes (Gráfico Circular)</h3>
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default GestionVentas;
