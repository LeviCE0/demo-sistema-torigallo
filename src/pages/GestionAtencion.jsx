import React, { useEffect, useState } from 'react';
import '../styles/GestionAtencion.css';
import CardDashboard from '../components/CardDashboard';
import Table from '../components/Table';
import MenuSideLeft from '../components/MenuSideLeft'; // Importa el componente del menú lateral
import iconPedidos from '../assets/icon-pedidos.png';
import iconCancelados from '../assets/icon-cancelados.png';
import CustomSelect from '../components/CustomSelect'; 
import YearSelect from '../components/YearSelect'; 

// Datos estáticos para reemplazar el uso de APIs
const pedidosCanceladosEstaticos = [
  {
    Mesa: '1',
    Comentario: 'Cliente canceló por demora en el servicio',
    "Fecha De Cancelacion": '2024-10-15',
  },
  {
    Mesa: '3',
    Comentario: 'Cancelación por cambio de planes',
    "Fecha De Cancelacion": '2024-09-25',
  },
  {
    Mesa: '5',
    Comentario: 'Cliente no llegó a la hora programada',
    "Fecha De Cancelacion": '2024-10-10',
  },
];

function GestionAtencion() {
  const [totalPedidos, setTotalPedidos] = useState(120); // Ejemplo de número estático de pedidos
  const [totalCancelados, setTotalCancelados] = useState(pedidosCanceladosEstaticos.length); // Total de cancelados estáticos
  const [cancelaciones, setCancelaciones] = useState(pedidosCanceladosEstaticos); // Datos estáticos de cancelaciones
  const [cancelacionesFiltradas, setCancelacionesFiltradas] = useState(pedidosCanceladosEstaticos);
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
  const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Estado para el menú lateral

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
    <div className={`atencion-container ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
      <MenuSideLeft 
        isVisible={isMenuVisible} 
        toggleMenu={() => setIsMenuVisible(!isMenuVisible)} 
      />
      <h2 className='title-page'>Gestión de Atenciones</h2>
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
    </div>
  );
}

export default GestionAtencion;
