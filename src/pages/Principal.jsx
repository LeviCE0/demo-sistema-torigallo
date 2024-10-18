import React, { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import CardDashboard from '../components/CardDashboard';
import Table from '../components/Table';
import CustomSelect from '../components/CustomSelect';
import YearSelect from '../components/YearSelect';
import MenuSideLeft from '../components/MenuSideLeft';
import '../styles/Principal.css';

import iconVentas from '../assets/icon-ventas.png';
import iconPedidos from '../assets/icon-pedidos.png';

function Principal() {
  const [productos, setProductos] = useState([]);
  const [ventasAnimadas, setVentasAnimadas] = useState(0);
  const [pedidosAnimados, setPedidosAnimados] = useState(0);
  const [datosVentasMensuales, setDatosVentasMensuales] = useState([]);
  const [conteoPedidosMensuales, setConteoPedidosMensuales] = useState([]);
  const [haAnimado, setHaAnimado] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina] = useState(10);
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
  const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (!haAnimado) {
      obtenerDatosDashboard();
      obtenerProductos();
      obtenerDatosVentasMensuales();
      obtenerConteoPedidosMensuales();
      setHaAnimado(true);
    }
  }, [haAnimado]);

  useEffect(() => {
    obtenerProductos();
  }, [mesSeleccionado, anioSeleccionado]);

  const obtenerProductos = () => {
    const productosDemo = [
      { Producto: 'Producto 1', Categoria: 'Categoría 1', CantidadVendida: 50, fechaVenta: '2024-10-01' },
      { Producto: 'Producto 2', Categoria: 'Categoría 2', CantidadVendida: 30, fechaVenta: '2024-10-05' },
      { Producto: 'Producto 3', Categoria: 'Categoría 3', CantidadVendida: 70, fechaVenta: '2024-10-10' },
    ];
    setProductos(productosDemo);
  };

  const obtenerDatosDashboard = () => {
    const totalVentasDemo = 5000;
    const totalPedidosDemo = 120;
    animarConteo(setVentasAnimadas, totalVentasDemo);
    animarConteo(setPedidosAnimados, totalPedidosDemo);
  };

  const obtenerDatosVentasMensuales = () => {
    const ventasMensualesDemo = [
      { mes: 'Enero', ventas: 3000 },
      { mes: 'Febrero', ventas: 4500 },
      { mes: 'Marzo', ventas: 2000 },
      { mes: 'Abril', ventas: 3800 },
      { mes: 'Mayo', ventas: 1500 },
      { mes: 'Junio', ventas: 5000 },
      { mes: 'Julio', ventas: 3200 },
      { mes: 'Agosto', ventas: 4200 },
      { mes: 'Septiembre', ventas: 3000 },
      { mes: 'Octubre', ventas: 3700 },
      { mes: 'Noviembre', ventas: 4500 },
      { mes: 'Diciembre', ventas: 6000 },
    ];
    setDatosVentasMensuales(ventasMensualesDemo);
  };

  const obtenerConteoPedidosMensuales = () => {
    const pedidosMensualesDemo = [
      { mes: 'Enero', pedidos: 100 },
      { mes: 'Febrero', pedidos: 120 },
      { mes: 'Marzo', pedidos: 140 },
      { mes: 'Abril', pedidos: 110 },
      { mes: 'Mayo', pedidos: 150 },
      { mes: 'Junio', pedidos: 130 },
      { mes: 'Julio', pedidos: 160 },
      { mes: 'Agosto', pedidos: 180 },
      { mes: 'Septiembre', pedidos: 170 },
      { mes: 'Octubre', pedidos: 190 },
      { mes: 'Noviembre', pedidos: 200 },
      { mes: 'Diciembre', pedidos: 220 },
    ];
    setConteoPedidosMensuales(pedidosMensualesDemo);
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

  const filtrarProductos = () => {
    const productosFiltrados = productos.filter(producto => {
      const fechaVenta = new Date(producto.fechaVenta);
      const mesProducto = fechaVenta.getMonth() + 1;
      const anioProducto = fechaVenta.getFullYear();
      return mesProducto === mesSeleccionado && anioProducto === anioSeleccionado;
    });

    return productosFiltrados;
  };

  const productosFiltrados = filtrarProductos();
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPaginaActual = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
  const numeroPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const paginas = Array.from({ length: numeroPaginas }, (_, index) => index + 1);

  const columnasProductos = ['Producto', 'Categoria', 'CantidadVendida'];


  return (
    <div className={`principal-layout ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
      <MenuSideLeft isVisible={isMenuVisible} toggleMenu={() => setMenuVisible(!isMenuVisible)} />
      <div className="principal-container">
        <h1>Bienvenido/a</h1>
      </div>
      <div className='cards-dashboards'>
        <CardDashboard title="Ventas del Mes Actual" value={`S/ ${ventasAnimadas}`} image={iconVentas} className="ventas" />
        <CardDashboard title="Pedidos del Mes Actual" value={pedidosAnimados} image={iconPedidos} className="pedidos" />
      </div>
      <div className='table-products-container'>
        <h3>Productos Más Vendidos</h3>
        <div className="filters-container">
          <div>
            <CustomSelect selectedMonth={mesSeleccionado} onChange={setMesSeleccionado} />
          </div>
          <div>
            <YearSelect selectedYear={anioSeleccionado} onChange={setAnioSeleccionado} />
          </div>
        </div>
        <Table columns={columnasProductos} data={productosPaginaActual} />
      </div>
      <div className='pagination'>
        {paginas.map(numero => (
          <button key={numero} onClick={() => cambiarPagina(numero)} className={numero === paginaActual ? 'active' : ''}>
            {numero}
          </button>
        ))}
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
  );

}

export default Principal;
