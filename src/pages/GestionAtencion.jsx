import React, { useEffect, useState } from 'react';
import '../styles/GestionAtencion.css';
import CardDashboard from '../components/CardDashboard';
import Table from '../components/Table';
import iconPedidos from '../assets/icon-pedidos.png';
import iconCancelados from '../assets/icon-cancelados.png';
import CustomSelect from '../components/CustomSelect'; 
import YearSelect from '../components/YearSelect'; 

function GestionAtencion() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalCancelados, setTotalCancelados] = useState(0);
  const [cancelaciones, setCancelaciones] = useState([]);
  const [cancelacionesFiltradas, setCancelacionesFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
  const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());

  const obtenerDatos = async () => {
    try {
      const respuesta = await fetch('https://santamariahoteles.com/torigallo/backend/dashboard_data.php');
      if (!respuesta.ok) {
        throw new Error('Error al obtener datos del dashboard');
      }
      const data = await respuesta.json();
      setTotalPedidos(data.totalPedidos);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError(error.message);
    }
  };

  const obtenerPedidosCancelados = async () => {
    try {
      const respuesta = await fetch('https://santamariahoteles.com/torigallo/backend/order_cancel.php');
      if (!respuesta.ok) {
        throw new Error('Error al obtener pedidos cancelados');
      }
      const data = await respuesta.json();
      setTotalCancelados(data.length);
      setCancelaciones(data);
      setCancelacionesFiltradas(data);
    } catch (error) {
      console.error('Error en la solicitud de pedidos cancelados:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const obtenerDatosAsync = async () => {
      setCargando(true);
      await obtenerDatos();
      await obtenerPedidosCancelados();
      setCargando(false);
    };

    obtenerDatosAsync();
  }, []);

  useEffect(() => {
    const filtrarCancelaciones = () => {
      const filtradas = cancelaciones.filter(cancelacion => {
        const fechaCancelacion = new Date(cancelacion["Fecha De Cancelacion"]);
        return (
          fechaCancelacion.getMonth() + 1 === mesSeleccionado &&
          fechaCancelacion.getFullYear() === anioSeleccionado
        );
      });
      setCancelacionesFiltradas(filtradas);
    };

    filtrarCancelaciones();
  }, [mesSeleccionado, anioSeleccionado, cancelaciones]);

  const columnas = ['Mesa', 'Comentario', 'Fecha De Cancelacion'];

  return (
    <div className="atencion-container">
      <h2 className='title-page'>Gestión de Atenciones</h2>
      {cargando ? (
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
            <Table columns={columnas} data={cancelacionesFiltradas} />
          </div>
        </>
      )}
    </div>
  );
}

export default GestionAtencion;
