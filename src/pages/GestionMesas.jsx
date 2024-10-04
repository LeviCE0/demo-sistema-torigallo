import React, { useState, useEffect } from 'react';
import Card_Mesa from '../components/Card_Mesa';
import ModalComentario from '../components/ModalComentario';
import ModalCobro from '../components/ModalCobro'; // Importar el nuevo modal
import '../styles/GestionMesas.css';

function GestionMesas() {
    const [mesas, setMesas] = useState([]);
    const [filteredMesas, setFilteredMesas] = useState([]);
    const [filter, setFilter] = useState('Todas');
    const [showModal, setShowModal] = useState(false);
    const [showCobroModal, setShowCobroModal] = useState(false); // Estado para el modal de cobro
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

    const manejarCobro = (cobroData) => {
        if (mesaSeleccionada) {
            // Aquí se hace la lógica para guardar el cobro en la base de datos
            fetch(`https://santamariahoteles.com/torigallo/backend/guardar_cobro.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: mesaSeleccionada, ...cobroData }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Cobro registrado exitosamente.');
                    setShowCobroModal(false);
                    // Actualiza la mesa o realiza cualquier otra lógica necesaria
                } else {
                    alert('Hubo un problema al registrar el cobro.');
                }
            })
            .catch(error => console.error('Error al registrar el cobro:', error));
        } else {
            alert('No hay mesa seleccionada.');
        }
    };

    const manejarComentarioSubmit = (comentario) => {
        setShowModal(false);

        fetch(`https://santamariahoteles.com/torigallo/backend/cancelar_mesa.php`, {
            method: 'POST',
            body: JSON.stringify({ id: mesaSeleccionada, comentario }),
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
                            onCobrar={() => {
                                setShowCobroModal(true);
                                setMesaSeleccionada(mesa.id);
                            }} // Manejar el evento de cobrar
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

            {showCobroModal && (
                <ModalCobro
                    onClose={() => setShowCobroModal(false)}
                    onCobrar={manejarCobro}
                />
            )}
        </div>
    );
}

export default GestionMesas;
