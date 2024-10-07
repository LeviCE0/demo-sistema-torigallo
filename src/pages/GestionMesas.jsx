import React, { useState, useEffect } from 'react';
import Card_Mesa from '../components/Card_Mesa';
import ModalComentario from '../components/ModalComentario';
import ModalCobro from '../components/ModalCobro';
import '../styles/GestionMesas.css';

function GestionMesas() {
    const [mesas, setMesas] = useState([]);
    const [mesasFiltradas, setMesasFiltradas] = useState([]);
    const [filtro, setFiltro] = useState('Todas');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalCobro, setMostrarModalCobro] = useState(false);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

    useEffect(() => {
        fetch('https://santamariahoteles.com/torigallo/backend/get_mesas.php')
            .then((response) => response.json())
            .then((data) => {
                setMesas(data);
                setMesasFiltradas(data);
            })
            .catch((error) => console.error('Error al cargar las mesas:', error));
    }, []);

    const filtrarMesas = (estado) => {
        if (estado === 'Todas') {
            setMesasFiltradas(mesas);
        } else {
            const filtradas = mesas.filter((mesa) => mesa.estado === estado);
            setMesasFiltradas(filtradas);
        }
        setFiltro(estado);
    };

    const manejarCancelarAtencion = (idMesa) => {
        setMostrarModal(true);
        setMesaSeleccionada(idMesa);
    };

    const manejarCobro = (datosCobro) => {
        if (mesaSeleccionada) {
            fetch(`https://santamariahoteles.com/torigallo/backend/guardar_cobro.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: mesaSeleccionada, ...datosCobro }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Cobro registrado exitosamente.');
                    setMostrarModalCobro(false);
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
        setMostrarModal(false);

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
                setMesasFiltradas(nuevasMesas);
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
                    className={filtro === 'Todas' ? 'active-tab' : ''} 
                    onClick={() => filtrarMesas('Todas')}
                >
                    Todas las Mesas
                </button>
                <button 
                    className={filtro === 'Disponible' ? 'active-tab' : ''} 
                    onClick={() => filtrarMesas('Disponible')}
                >
                    Mesas Disponibles
                </button>
                <button 
                    className={filtro === 'No Disponible' ? 'active-tab' : ''} 
                    onClick={() => filtrarMesas('No Disponible')}
                >
                    Mesas No Disponibles
                </button>
                <button 
                    className={filtro === 'Reservado' ? 'active-tab' : ''} 
                    onClick={() => filtrarMesas('Reservado')}
                >
                    Mesas Reservadas
                </button>
            </div>

            <div className="mesas-grid">
                {mesasFiltradas.length > 0 ? (
                    mesasFiltradas.map((mesa) => (
                        <Card_Mesa 
                            key={mesa.id} 
                            id={mesa.id}
                            title={mesa.nombre} 
                            description={`${mesa.capacidad} personas`} 
                            status={mesa.estado}
                            onCancel={() => manejarCancelarAtencion(mesa.id)}
                            onCobrar={() => {
                                setMostrarModalCobro(true);
                                setMesaSeleccionada(mesa.id);
                            }}
                        />
                    ))
                ) : (
                    <p>No hay mesas para mostrar.</p>
                )}
            </div>

            {mostrarModal && (
                <ModalComentario
                    onSubmit={manejarComentarioSubmit}
                    onClose={() => setMostrarModal(false)}
                />
            )}

            {mostrarModalCobro && (
                <ModalCobro
                    onClose={() => setMostrarModalCobro(false)}
                    onCobrar={manejarCobro}
                />
            )}
        </div>
    );
}

export default GestionMesas;
