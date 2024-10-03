import React, { useEffect, useState } from 'react';
import '../styles/GestionAtencion.css';
import CardDashboard from '../components/CardDashboard';
import Table from '../components/Table'; // Importa tu componente de tabla
import iconPedidos from '../assets/icon-pedidos.png';
import iconCancelados from '../assets/icon-cancelados.png'; // Asegúrate de tener un icono para pedidos cancelados

function GestionAtencion() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalCancelados, setTotalCancelados] = useState(0);
  const [cancelaciones, setCancelaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para manejar errores

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
      setError(error.message); // Guarda el mensaje de error
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
    } catch (error) {
      console.error('Error en la solicitud de pedidos cancelados:', error);
      setError(error.message); // Guarda el mensaje de error
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      setIsLoading(true); // Establecer isLoading en true al inicio de las solicitudes
      await fetchData();
      await fetchPedidosCancelados();
      setIsLoading(false); // Establecer isLoading en false una vez que se han realizado las solicitudes
    };

    fetchDataAsync();
  }, []);

  const columns = ['id_mesa', 'comentario', 'fecha_cancelacion'];

  return (
    <div className="atencion-container">
      <h2 className='title-page'>Gestión de Atenciones</h2>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? ( // Muestra un mensaje de error si hay un error
        <p>Error: {error}</p>
      ) : (
        <>
          <div className='cards-dashboards'>
            <CardDashboard title="Pedidos Totales" value={totalPedidos} image={iconPedidos} />
            <CardDashboard title="Pedidos Cancelados" value={totalCancelados} image={iconCancelados} />
          </div>
          <h3 className="sub-title">Tabla de Cancelaciones</h3>
          <Table columns={columns} data={cancelaciones} />
        </>
      )}
    </div>
  );
}

export default GestionAtencion;
