import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import CardDashboard from '../components/CardDashboard';
import TableProductsSales from '../components/TableProductsSales';
import '../styles/Principal.css';

import iconVentas from '../assets/icon-ventas.png';
import iconPedidos from '../assets/icon-pedidos.png';

function Principal() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [ventasMes, setVentasMes] = useState(5000);
  const [pedidosMes, setPedidosMes] = useState(120);

  const products = [
    { name: 'Producto 1', sales: 150 },
    { name: 'Producto 2', sales: 100 },
    { name: 'Producto 3', sales: 80 },
    { name: 'Producto 4', sales: 60 }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    isAuthenticated && (
      <div>
        <div className="principal-container">
          <h1>Bienvenido/a</h1>
        </div>
        <div className='cards-dashboards'>
          <CardDashboard title="Ventas del Mes Actual" value={`$${ventasMes}`} image={iconVentas} />
          <CardDashboard title="Pedidos del Mes Actual" value={pedidosMes} image={iconPedidos} />
        </div>
        <div className='table-products-container'>
          <h3>Productos Más Vendidos</h3>
          <TableProductsSales products={products} />
        </div>
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
    )
  );
}

export default Principal;
