import React, { useState, useEffect } from 'react';
import '../styles/Historial.css';
import Table from '../components/Table';
import Loading from '../components/Loading';
import CardDashboard from '../components/CardDashboard';
import MenuSideLeft from '../components/MenuSideLeft'; // Importa el menú lateral
import totalIcon from '../assets/total_icon.png';

// Datos estáticos para las reservas canceladas
const reservasCanceladasEstaticas = [
  {
    Nombre: 'Juan Pérez',
    Dni: '12345678',
    Email: 'juan.perez@example.com',
    Celular: '987654321',
    Fecha: '2024-10-01',
    Hora: '14:00',
    Turno: 'tarde',
  },
  {
    Nombre: 'María López',
    Dni: '87654321',
    Email: 'maria.lopez@example.com',
    Celular: '987123456',
    Fecha: '2024-09-20',
    Hora: '12:00',
    Turno: 'mediodía',
  },
  {
    Nombre: 'Carlos Martínez',
    Dni: '45612378',
    Email: 'carlos.martinez@example.com',
    Celular: '987567890',
    Fecha: '2024-09-15',
    Hora: '20:00',
    Turno: 'noche',
  },
  // Puedes añadir más datos estáticos aquí
  // Asegúrate de que haya suficientes datos para probar la paginación.
];

function Historial() {
  const [reservasCanceladas, setReservasCanceladas] = useState([]); // Datos segmentados por página
  const [cargando, setCargando] = useState(false); // Estado de carga (innecesario con datos estáticos)
  const [totalPaginas, setTotalPaginas] = useState(1); // Total de páginas
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const [totalCanceladas, setTotalCanceladas] = useState(reservasCanceladasEstaticas.length); // Total de reservas canceladas
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú lateral

  const limite = 10; // Límite de elementos por página (para pruebas, lo he bajado a 2)

  // Función para obtener los datos de la página actual
  const obtenerDatosPaginados = () => {
    const inicio = (paginaActual - 1) * limite;
    const fin = inicio + limite;
    const datosPaginados = reservasCanceladasEstaticas.slice(inicio, fin);
    setReservasCanceladas(datosPaginados);
  };

  useEffect(() => {
    setCargando(true);

    // Calcula el número total de páginas
    const totalPaginasCalculadas = Math.ceil(reservasCanceladasEstaticas.length / limite);
    setTotalPaginas(totalPaginasCalculadas);

    // Obtiene los datos correspondientes a la página actual
    obtenerDatosPaginados();

    setCargando(false);
  }, [paginaActual]);

  const columnas = ['Nombre', 'Dni', 'Email', 'Celular', 'Fecha', 'Hora', 'Turno'];

  return (
    <div className={`historial-container ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
      <MenuSideLeft 
        isVisible={isMenuVisible} 
        toggleMenu={() => setIsMenuVisible(!isMenuVisible)} 
      />
      <h2>Historial de Reservas Canceladas</h2>
      {cargando ? (
        <Loading />
      ) : (
        <>
          <CardDashboard 
            title="Total de Reservas Canceladas" 
            value={totalCanceladas} 
            image={totalIcon} 
            className="pedidos"  
          />
          <Table columns={columnas} data={reservasCanceladas} />
          <div className="pagination">
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))} disabled={paginaActual === 1}>
              Anterior
            </button>
            <button onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))} disabled={paginaActual === totalPaginas}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Historial;
