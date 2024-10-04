import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import CardDashboard from '../components/CardDashboard';
import Table from '../components/Table';
import '../styles/Principal.css';

import iconVentas from '../assets/icon-ventas.png';
import iconPedidos from '../assets/icon-pedidos.png';

function Principal() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const tamanoPagina = 10;
  const [ventasAnimadas, setVentasAnimadas] = useState(0);
  const [pedidosAnimados, setPedidosAnimados] = useState(0);
  const [datosVentasMensuales, setDatosVentasMensuales] = useState([]);
  const [conteoPedidosMensuales, setConteoPedidosMensuales] = useState(0);
  const [haAnimado, setHaAnimado] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      obtenerProductosMasVendidos();
      obtenerDatosVentasMensuales();
      obtenerConteoPedidosMensuales();

      if (!haAnimado) {
        obtenerDatosDashboard();
        setHaAnimado(true);
      }
    }
  }, [isAuthenticated, navigate, paginaActual]);

  const obtenerProductosMasVendidos = async () => {
    try {
      const response = await fetch(`https://santamariahoteles.com/torigallo/backend/products_sales.php?page=${paginaActual}&pageSize=${tamanoPagina}`);
      if (!response.ok) throw new Error('Error al obtener productos');
      const data = await response.json();
      setProductos(data.products);
      setTotalProductos(data.total);
    } catch (error) {
      console.error('Error obteniendo productos:', error);
    }
  };

  const obtenerDatosDashboard = async () => {
    try {
      const response = await fetch('https://santamariahoteles.com/torigallo/backend/dashboard_data.php');
      if (!response.ok) throw new Error('Error al obtener datos del dashboard');
      const data = await response.json();
      animarConteo(setVentasAnimadas, data.totalVentas);
      animarConteo(setPedidosAnimados, data.totalPedidos);
    } catch (error) {
      console.error('Error obteniendo datos del dashboard:', error);
    }
  };

  const obtenerDatosVentasMensuales = async () => {
    try {
      const response = await fetch('https://santamariahoteles.com/torigallo/backend/ventas_mensuales.php');
      if (!response.ok) throw new Error('Error al obtener ventas mensuales');
      const data = await response.json();
      setDatosVentasMensuales(data);
    } catch (error) {
      console.error('Error obteniendo ventas mensuales:', error);
    }
  };

  const obtenerConteoPedidosMensuales = async () => {
    try {
      const response = await fetch('https://santamariahoteles.com/torigallo/backend/order_month.php');
      if (!response.ok) throw new Error('Error al obtener conteo de pedidos');
      const data = await response.json();
      setConteoPedidosMensuales(data);
    } catch (error) {
      console.error('Error obteniendo conteo de pedidos:', error);
    }
  };

  const animarConteo = (setValor, valorObjetivo) => {
    let conteo = 0;
    const incremento = Math.ceil(valorObjetivo / 100);
    const intervalo = setInterval(() => {
      if (conteo < valorObjetivo) {
        conteo += incremento;
        if (conteo > valorObjetivo) conteo = valorObjetivo;
        setValor(conteo);
      } else {
        clearInterval(intervalo);
      }
    }, 10);
  };

  const totalPaginas = Math.ceil(totalProductos / tamanoPagina);

  const manejarSiguientePagina = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const manejarPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const columnasProductos = ['Producto', 'Cantidad Vendida'];

  return (
    isAuthenticated && (
      <div>
        <div className="principal-container">
          <h1>Bienvenido/a</h1>
        </div>
        <div className='cards-dashboards'>
          <CardDashboard title="Ventas del Mes Actual" value={`S/ ${ventasAnimadas}`} image={iconVentas} className="ventas" />
          <CardDashboard title="Pedidos del Mes Actual" value={pedidosAnimados} image={iconPedidos} className="pedidos" />
        </div>
        <div className='table-products-container'>
          <h3>Productos Más Vendidos</h3>
          <Table columns={columnasProductos} data={productos} /> 
          <div className="pagination">
            <button onClick={manejarPaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button onClick={manejarSiguientePagina} disabled={paginaActual === totalPaginas}>Siguiente</button>
          </div>
        </div>
        <div className="charts-container">
          <div className="chart">
            <h3>Ventas del Mes (Gráfico de Barras)</h3>
            <BarChart monthlySalesData={datosVentasMensuales} />
          </div>
          <div className="chart">
            <h3>Cantidad de Pedidos (Gráfico Circular)</h3>
            <PieChart ordersData={conteoPedidosMensuales} />
          </div>
        </div>
      </div>
    )
  );
}

export default Principal;
