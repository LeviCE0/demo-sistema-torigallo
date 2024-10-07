import React, { useEffect, useState } from 'react';
import '../styles/GestionAtencion.css';
import CardDashboard from '../components/CardDashboard';
import Table from '../components/Table';
import iconPedidos from '../assets/icon-pedidos.png';
import iconCancelados from '../assets/icon-cancelados.png';
import CustomSelect from '../components/CustomSelect'; // Asegúrate de importar esto
import YearSelect from '../components/YearSelect'; // Asegúrate de importar esto

function GestionAtencion() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalCancelados, setTotalCancelados] = useState(0);
  const [cancelaciones, setCancelaciones] = useState([]);
  const [filteredCancelaciones, setFilteredCancelaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1); // Mes actual
  const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear()); // Año actual

  const fetchData = async () => {
    try {
      const response = await fetch('https://santamariahoteles.com/torigallo/backend/dashboard_data.php');
      if (!response.ok) {
        throw new Error('Error al obtener datos del dashboard');
      }
      const data = await response.json();
      setTotalPedidos(data.totalPedidos);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError(error.message);
    }
  };

  const fetchPedidosCancelados = async () => {
    try {
      const response = await fetch('https://santamariahoteles.com/torigallo/backend/order_cancel.php');
      if (!response.ok) {
        throw new Error('Error al obtener pedidos cancelados');
      }
      const data = await response.json();
      setTotalCancelados(data.length);
      setCancelaciones(data);
      setFilteredCancelaciones(data); // Inicialmente mostrar todos
    } catch (error) {
      console.error('Error en la solicitud de pedidos cancelados:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      setIsLoading(true);
      await fetchData();
      await fetchPedidosCancelados();
      setIsLoading(false);
    };

    fetchDataAsync();
  }, []);

  // Filtrado de cancelaciones
  useEffect(() => {
    const filterCancelaciones = () => {
      const filtered = cancelaciones.filter(cancelacion => {
        const fechaCancelacion = new Date(cancelacion["Fecha De Cancelacion"]); // Usa la clave correcta aquí
        return (
          fechaCancelacion.getMonth() + 1 === mesSeleccionado &&
          fechaCancelacion.getFullYear() === anioSeleccionado
        );
      });
      setFilteredCancelaciones(filtered);
    };

    filterCancelaciones();
  }, [mesSeleccionado, anioSeleccionado, cancelaciones]);

  const columns = ['Mesa', 'Comentario', 'Fecha De Cancelacion'];

  return (
    <div className="atencion-container">
      <h2 className='title-page'>Gestión de Atenciones</h2>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className='cards-dashboards'>
            <CardDashboard title="Pedidos Totales" value={totalPedidos} image={iconPedidos} className="pedidos" />
            <CardDashboard title="Pedidos Cancelados" value={totalCancelados} image={iconCancelados} className="cancelados" />
          </div>
          <div className='table-atencion-container'>
            <h3 className="sub-title">Tabla de Cancelaciones</h3>
            <div className="filters-container">
              <CustomSelect selectedMonth={mesSeleccionado} onChange={setMesSeleccionado} />
              <YearSelect selectedYear={anioSeleccionado} onChange={setAnioSeleccionado} />
            </div>
            <Table columns={columns} data={filteredCancelaciones} />
          </div>
        </>
      )}
    </div>
  );
}

export default GestionAtencion;
