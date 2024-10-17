import React, { useState } from 'react';
import Card_Mesa from '../components/Card_Mesa';
import ModalComentario from '../components/ModalComentario';
import ModalCobro from '../components/ModalCobro';
import MenuSideLeft from '../components/MenuSideLeft';
import '../styles/GestionMesas.css';

function GestionMesas() {
    const [mesas, setMesas] = useState([
        { id: 1, nombre: 'Mesa 1', capacidad: 4, estado: 'Disponible' },
        { id: 2, nombre: 'Mesa 2', capacidad: 2, estado: 'No Disponible' },
        { id: 3, nombre: 'Mesa 3', capacidad: 6, estado: 'Reservado' },
        { id: 4, nombre: 'Mesa 4', capacidad: 4, estado: 'Disponible' },
        { id: 5, nombre: 'Mesa 5', capacidad: 3, estado: 'No Disponible' },
        { id: 6, nombre: 'Mesa 6', capacidad: 5, estado: 'Reservado' },
        { id: 7, nombre: 'Mesa 7', capacidad: 8, estado: 'Disponible' },
    ]);
    const [mesasFiltradas, setMesasFiltradas] = useState(mesas);
    const [filtro, setFiltro] = useState('Todas');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalCobro, setMostrarModalCobro] = useState(false);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [isMenuVisible, setMenuVisible] = useState(true);

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
        setMostrarModalCobro(false);
    };

    const manejarComentarioSubmit = (comentario) => {
        setMostrarModal(false);
        const nuevasMesas = mesas.map(mesa =>
            mesa.id === mesaSeleccionada ? { ...mesa, estado: 'Disponible' } : mesa
        );
        setMesas(nuevasMesas);
        setMesasFiltradas(nuevasMesas);
        localStorage.setItem(`estado_mesa_${mesaSeleccionada}`, JSON.stringify({ status: 'Disponible' }));
        alert("Atención cancelada con éxito.");
    };


    return (
        <div className="gestion-mesas-layout">
            <MenuSideLeft isVisible={isMenuVisible} toggleMenu={() => setMenuVisible(!isMenuVisible)} />
            <div className={`gestion-mesas-container ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
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
        </div>
    );
}

export default GestionMesas;
