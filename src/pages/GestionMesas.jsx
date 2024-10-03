import React, { useState, useEffect } from 'react';
import Card_Mesa from '../components/Card_Mesa';
import ModalComentario from '../components/ModalComentario';
import '../styles/GestionMesas.css';

function GestionMesas() {
  const [mesas, setMesas] = useState([]);
  const [filteredMesas, setFilteredMesas] = useState([]);
  const [filter, setFilter] = useState('Todas');
  const [showModal, setShowModal] = useState(false);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  useEffect(() => {
    fetch('https://santamariahoteles.com/torigallo/backend/get_mesas.php')
      .then((response) => response.json())
      .then((data) => {
        setMesas(data);
        setFilteredMesas(data);
      })
      .catch((error) => console.error('Error al cargar las mesas:', error));
  }, []);

  const filterMesas = (estado) => {
    if (estado === 'Todas') {
      setFilteredMesas(mesas);
    } else {
      const filtered = mesas.filter((mesa) => mesa.estado === estado);
      setFilteredMesas(filtered);
    }
    setFilter(estado);
  };

  const manejarCancelarAtencion = (idMesa) => {
    setShowModal(true);
    setMesaSeleccionada(idMesa);
  };

  const manejarComentarioSubmit = (comentario) => {
    setShowModal(false);

    fetch(`https://santamariahoteles.com/torigallo/backend/cancelar_mesa.php`, {
      method: 'POST',
      body: JSON.stringify({ id: mesaSeleccionada, comentario}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Mesa cancelada exitosamente.');
          const nuevasMesas = mesas.map(mesa =>
            mesa.id === mesaSeleccionada ? { ...mesa, estado: 'Disponible' } : mesa
          );
          setMesas(nuevasMesas);
          setFilteredMesas(nuevasMesas);
        } else {
          alert('Hubo un problema al cancelar la mesa.');
        }
      })
      .catch((error) => console.error('Error al cancelar la mesa:', error));
  };

  return (
    <div className="gestion-mesas-container">
      <h2>Gestión de Mesas</h2>
      <div className="tabs">
        <button 
          className={filter === 'Todas' ? 'active-tab' : ''} 
          onClick={() => filterMesas('Todas')}
        >
          Todas las Mesas
        </button>
        <button 
          className={filter === 'Disponible' ? 'active-tab' : ''} 
          onClick={() => filterMesas('Disponible')}
        >
          Mesas Disponibles
        </button>
        <button 
          className={filter === 'No Disponible' ? 'active-tab' : ''} 
          onClick={() => filterMesas('No Disponible')}
        >
          Mesas No Disponibles
        </button>
        <button 
          className={filter === 'Reservado' ? 'active-tab' : ''} 
          onClick={() => filterMesas('Reservado')}
        >
          Mesas Reservadas
        </button>
      </div>

      <div className="mesas-grid">
        {filteredMesas.length > 0 ? (
          filteredMesas.map((mesa) => (
            <Card_Mesa 
              key={mesa.id} 
              id={mesa.id}
              title={mesa.nombre} 
              description={`${mesa.capacidad} personas`} 
              status={mesa.estado}
              onCancel={() => manejarCancelarAtencion(mesa.id)}
            />
          ))
        ) : (
          <p>No hay mesas para mostrar.</p>
        )}
      </div>

      {showModal && (
        <ModalComentario
          onSubmit={manejarComentarioSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default GestionMesas;
