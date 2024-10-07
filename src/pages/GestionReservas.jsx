import React, { useState, useEffect } from 'react';
import '../styles/GestionReservas.css';
import Modal from '../components/Modal';
import ModalForm from '../components/ModalForm';
import Loading from '../components/Loading';
import Table from '../components/Table';

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
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const columnas = ['Nombre', 'Dni', 'Email', 'Celular', 'Fecha', 'Hora', 'Turno', 'Mesas', 'Acciones'];

    const manejarCambio = (e) => {
        setDatosFormulario({
            ...datosFormulario,
            [e.target.name]: e.target.value,
        });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await fetch('https://santamariahoteles.com/torigallo/backend/reservas/verify_mesas.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fecha: datosFormulario.fecha,
                    turno: datosFormulario.turno,
                    capacidad: datosFormulario.capacidad,
                    hora: datosFormulario.hora,
                }),
            });

            if (respuesta.ok) {
                const data = await respuesta.json();

                if (data.success && data.mesas.length > 0) {
                    const respuestaReserva = await fetch('https://santamariahoteles.com/torigallo/backend/reservas/create_reservas.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            nombre: datosFormulario.nombre,
                            dni: datosFormulario.dni,
                            email: datosFormulario.email,
                            celular: datosFormulario.celular,
                            fecha: datosFormulario.fecha,
                            hora: datosFormulario.hora,
                            turno: datosFormulario.turno,
                            mesas: data.mesas.map(mesa => mesa.id),
                        }),
                    });

                    if (respuestaReserva.ok) {
                        const datosReserva = await respuestaReserva.json();
                        setMensajeModal(datosReserva.success ? 'Reserva creada exitosamente' : 'Error al crear la reserva');
                        fetchReservas();
                    } else {
                        setMensajeModal('Error: No se pudo crear la reserva.');
                    }
                } else {
                    setMensajeModal('Error: No hay suficientes mesas disponibles.');
                }
            } else {
                setMensajeModal('Error al verificar la disponibilidad de mesas.');
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setMensajeModal('Error en la solicitud. Verifique la consola.');
        }

        setMostrarMensajeModal(true);
        setMostrarModalFormulario(false);
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
            turno: 'tarde',
            capacidad: ''
        });
        setMostrarModalFormulario(false);
    };

    const fetchReservas = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch('https://santamariahoteles.com/torigallo/backend/reservas/get_reservas.php');
            if (respuesta.ok) {
                const data = await respuesta.json();
                setReservas(data.reservas);
            } else {
                console.error('Error al obtener reservas');
            }
        } catch (error) {
            console.error('Error en la solicitud de reservas:', error);
        }
        setCargando(false);
    };

    const manejarEliminar = async (idReserva) => {
        try {
            const respuesta = await fetch('https://santamariahoteles.com/torigallo/backend/reservas/delete_reserva.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reserva_id: idReserva }),
            });

            if (respuesta.ok) {
                const data = await respuesta.json();
                if (data.success) {
                    setMensajeModal('Reserva eliminada exitosamente');
                    fetchReservas();
                } else {
                    setMensajeModal('Error al eliminar la reserva');
                }
            } else {
                setMensajeModal('Error: No se pudo eliminar la reserva.');
            }
        } catch (error) {
            console.error("Error en la solicitud de eliminación:", error);
            setMensajeModal('Error en la solicitud de eliminación.');
        }

        setMostrarMensajeModal(true);
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    return (
        <div className="reservas-container">
            <h2>Gestión de Reservas</h2>
            {cargando ? (
                <Loading />
            ) : (
                <Table 
                    columns={columnas} 
                    data={reservas.map(reserva => ({
                        ...reserva,
                        Acciones: (
                            <button 
                                className="delete-button" 
                                onClick={() => manejarEliminar(reserva.id)}
                            >
                                Eliminar
                            </button>
                        )
                    }))}
                />
            )}

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
