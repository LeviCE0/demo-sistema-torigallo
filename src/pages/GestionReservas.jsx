import React, { useState } from 'react';
import '../styles/GestionReservas.css';
import Modal from '../components/Modal';
import ModalForm from '../components/ModalForm';
import Table from '../components/Table';
import MenuSideLeft from '../components/MenuSideLeft'; // Importa el componente

// Datos estáticos de ejemplo para las reservas
const reservasEstaticas = [
    {
        id: 1,
        nombre: 'Juan Pérez',
        dni: '12345678',
        email: 'juan@gmail.com',
        celular: '987654321',
        fecha: '2024-10-20',
        hora: '19:00',
        turno: 'tarde',
        capacidad: 4,
    },
    {
        id: 2,
        nombre: 'María López',
        dni: '87654321',
        email: 'maria@hotmail.com',
        celular: '987123456',
        fecha: '2024-10-21',
        hora: '20:00',
        turno: 'noche',
        capacidad: 2,
    },
    // Puedes agregar más reservas aquí
];

function Reservas() {
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: '',
        dni: '',
        email: '',
        celular: '',
        fecha: '',
        hora: '',
        turno: 'tarde',
        capacidad: '',
    });

    const [mensajeModal, setMensajeModal] = useState('');
    const [mostrarMensajeModal, setMostrarMensajeModal] = useState(false);
    const [mostrarModalFormulario, setMostrarModalFormulario] = useState(false);
    const [reservas, setReservas] = useState(reservasEstaticas); // Usar datos estáticos

    const columnas = ['Nombre', 'Dni', 'Email', 'Celular', 'Fecha', 'Hora', 'Turno', 'Capacidad', 'Acciones'];

    const manejarCambio = (e) => {
        setDatosFormulario({
            ...datosFormulario,
            [e.target.name]: e.target.value,
        });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();

        // Agregar la nueva reserva a los datos estáticos
        const nuevaReserva = {
            id: reservas.length + 1, // Generar un nuevo ID
            ...datosFormulario,
        };

        setReservas([...reservas, nuevaReserva]);
        setMensajeModal('Reserva creada exitosamente');
        setMostrarMensajeModal(true);
        cerrarModalFormulario();
    };

    const cerrarMensajeModal = () => {
        setMostrarMensajeModal(false);
        setMensajeModal('');
    };

    const cerrarModalFormulario = () => {
        setDatosFormulario({
            nombre: '',
            dni: '',
            email: '',
            celular: '',
            fecha: '',
            hora: '',
            turno: 'tarde',
            capacidad: '',
        });
        setMostrarModalFormulario(false);
    };

    const manejarEliminar = (idReserva) => {
        setReservas(reservas.filter(reserva => reserva.id !== idReserva));
        setMensajeModal('Reserva eliminada exitosamente');
        setMostrarMensajeModal(true);
    };

    return (
        <div className="reservas-container">
            <MenuSideLeft /> {/* Agrega el componente del menú lateral */}
            <h2>Gestión de Reservas</h2>
            <Table 
                columns={columnas} 
                data={reservas.map(reserva => ({
                    Nombre: reserva.nombre,
                    Dni: reserva.dni,
                    Email: reserva.email,
                    Celular: reserva.celular,
                    Fecha: reserva.fecha,
                    Hora: reserva.hora,
                    Turno: reserva.turno,
                    Capacidad: reserva.capacidad,
                    Acciones: (
                        <button 
                            className="delete-button" 
                            onClick={() => manejarEliminar(reserva.id)}
                        >
                            Eliminar
                        </button>
                    ),
                }))}
            />

            <button className="reservar-button" onClick={() => setMostrarModalFormulario(true)}>Crear Reserva</button>

            {mostrarModalFormulario && (
                <ModalForm
                    formData={datosFormulario}
                    handleChange={manejarCambio}
                    handleSubmit={manejarEnvio}
                    closeModalForm={cerrarModalFormulario}
                />
            )}

            {mostrarMensajeModal && (
                <Modal message={mensajeModal} onClose={cerrarMensajeModal} />
            )}
        </div>
    );
}

export default Reservas;
