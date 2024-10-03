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

  const [ventasMes, setVentasMes] = useState(0);
  const [pedidosMes, setPedidosMes] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [animatedVentas, setAnimatedVentas] = useState(0);
  const [animatedPedidos, setAnimatedPedidos] = useState(0);
  const [monthlySalesData, setMonthlySalesData] = useState([]); // Para ventas por mes
  const [monthlyOrdersCount, setMonthlyOrdersCount] = useState(0); // Para pedidos

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      fetchMostSoldProducts();
      fetchDashboardData();
      fetchMonthlySalesData(); // Obtener ventas mensuales
      fetchMonthlyOrdersCount(); // Obtener conteo de pedidos
    }
  }, [isAuthenticated, navigate, currentPage]);

  const fetchMostSoldProducts = async () => {
    try {
      const response = await fetch(`https://santamariahoteles.com/torigallo/backend/products_sales.php?page=${currentPage}&pageSize=${pageSize}`);
      if (!response.ok) throw new Error('Error al obtener productos');
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
        const response = await fetch('https://santamariahoteles.com/torigallo/backend/dashboard_data.php');
        if (!response.ok) throw new Error('Error al obtener datos del dashboard');

        const data = await response.json(); // Aquí es donde conviertes la respuesta a JSON
        animateCount(setAnimatedVentas, data.totalVentas); // Cambia response.data a data
        animateCount(setAnimatedPedidos, data.totalPedidos); // Cambia response.data a data
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchMonthlySalesData = async () => {
    try {
      const response = await fetch('https://santamariahoteles.com/torigallo/backend/ventas_mensuales.php');
      if (!response.ok) throw new Error('Error al obtener ventas mensuales');
      const data = await response.json();
      setMonthlySalesData(data); // Espera un arreglo de datos para el gráfico
    } catch (error) {
      console.error('Error fetching monthly sales data:', error);
    }
  };

  const fetchMonthlyOrdersCount = async () => {
    try {
        const response = await fetch('https://santamariahoteles.com/torigallo/backend/order_month.php');
        if (!response.ok) throw new Error('Error al obtener conteo de pedidos');
        const data = await response.json();
        setMonthlyOrdersCount(data); // Ahora es un arreglo de objetos con mes y totalPedidos
    } catch (error) {
        console.error('Error fetching monthly orders count:', error);
    }
  };

  const animateCount = (setValue, targetValue) => {
    let count = 0;
    const increment = Math.ceil(targetValue / 100);
    const interval = setInterval(() => {
      if (count < targetValue) {
        count += increment;
        if (count > targetValue) count = targetValue;
        setValue(count);
      } else {
        clearInterval(interval);
      }
    }, 10);
  };

  const totalPages = Math.ceil(totalProducts / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    isAuthenticated && (
      <div>
        <div className="principal-container">
          <h1>Bienvenido/a</h1>
        </div>
        <div className='cards-dashboards'>
          <CardDashboard title="Ventas del Mes Actual" value={`$${animatedVentas}`} image={iconVentas} />
          <CardDashboard title="Pedidos del Mes Actual" value={animatedPedidos} image={iconPedidos} />
        </div>
        <div className='table-products-container'>
          <h3>Productos Más Vendidos</h3>
          <TableProductsSales products={products} />
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
          </div>
        </div>
        <div className="charts-container">
          <div className="chart">
            <h3>Ventas del Mes (Gráfico de Barras)</h3>
            <BarChart monthlySalesData={monthlySalesData} />
          </div>
          <div className="chart">
            <h3>Cantidad de Pedidos (Gráfico Circular)</h3>
            <PieChart ordersData={monthlyOrdersCount} />
          </div>
        </div>
      </div>
    )
  );
}

export default Principal;
