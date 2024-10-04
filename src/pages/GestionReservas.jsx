import React, { useState, useEffect } from 'react';
import '../styles/GestionReservas.css';
import Modal from '../components/Modal';
import ModalForm from '../components/ModalForm';
import Loading from '../components/Loading';
import Table from '../components/Table'; // Importa tu componente de tabla

function Reservas() {
    const [formData, setFormData] = useState({
        nombre: '',
        dni: '',
        email: '',
        celular: '',
        fecha: '',
        hora: '',
        turno: 'tarde',
        capacidad: '',
    });

    const [modalMessage, setModalMessage] = useState('');
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [showModalForm, setShowModalForm] = useState(false);
    const [reservas, setReservas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const columns = ['Nombre', 'Dni', 'Email', 'Celular', 'Fecha', 'Hora', 'Turno', 'Mesas', 'Acciones'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://santamariahoteles.com/torigallo/backend/reservas/verify_mesas.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fecha: formData.fecha,
                    turno: formData.turno,
                    capacidad: formData.capacidad,
                    hora: formData.hora,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.success && data.mesas.length > 0) {
                    const reservaResponse = await fetch('https://santamariahoteles.com/torigallo/backend/reservas/create_reservas.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            nombre: formData.nombre,
                            dni: formData.dni,
                            email: formData.email,
                            celular: formData.celular,
                            fecha: formData.fecha,
                            hora: formData.hora,
                            turno: formData.turno,
                            mesas: data.mesas.map(mesa => mesa.id),
                        }),
                    });

                    if (reservaResponse.ok) {
                        const reservaData = await reservaResponse.json();
                        setModalMessage(reservaData.success ? 'Reserva creada exitosamente' : 'Error al crear la reserva');
                        fetchReservas();
                    } else {
                        setModalMessage('Error: No se pudo crear la reserva.');
                    }
                } else {
                    setModalMessage('Error: No hay suficientes mesas disponibles.');
                }
            } else {
                setModalMessage('Error al verificar la disponibilidad de mesas.');
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setModalMessage('Error en la solicitud. Verifique la consola.');
        }

        setShowModalMessage(true);
        setShowModalForm(false);
    };

    const closeModalMessage = () => {
        setShowModalMessage(false);
        setModalMessage('');
    };

    const closeModalForm = () => {
        setFormData({ // Restablece el formulario al cerrarlo
            nombre: '',
            dni: '',
            email: '',
            celular: '',
            fecha: '',
            turno: 'tarde', // O el valor que desees como predeterminado
            capacidad: ''
        });
        setShowModalForm(false); // Cerrar el modal
    };

    const fetchReservas = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://santamariahoteles.com/torigallo/backend/reservas/get_reservas.php');
            if (response.ok) {
                const data = await response.json();
                setReservas(data.reservas);
            } else {
                console.error('Error al obtener reservas');
            }
        } catch (error) {
            console.error('Error en la solicitud de reservas:', error);
        }
        setIsLoading(false);
    };

    const handleDelete = async (reservaId) => {
        try {
            const response = await fetch('https://santamariahoteles.com/torigallo/backend/reservas/delete_reserva.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reserva_id: reservaId }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setModalMessage('Reserva eliminada exitosamente');
                    fetchReservas(); // Actualizar la lista de reservas
                } else {
                    setModalMessage('Error al eliminar la reserva');
                }
            } else {
                setModalMessage('Error: No se pudo eliminar la reserva.');
            }
        } catch (error) {
            console.error("Error en la solicitud de eliminación:", error);
            setModalMessage('Error en la solicitud de eliminación.');
        }

        setShowModalMessage(true);
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    return (
        <div className="reservas-container">
            <h2>Gestión de Reservas</h2>
            {isLoading ? (
                <Loading />
            ) : (
                <Table 
                    columns={columns} 
                    data={reservas.map(reserva => ({
                        ...reserva,
                        Acciones: (
                            <button 
                                className="delete-button" 
                                onClick={() => handleDelete(reserva.id)}
                            >
                                Eliminar
                            </button>
                        )
                    }))}
                />
            )}

            <button className="reservar-button" onClick={() => setShowModalForm(true)}>Crear Reserva</button>

            {showModalForm && (
                <ModalForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    closeModalForm={closeModalForm}
                />
            )}

            {showModalMessage && (
                <Modal message={modalMessage} onClose={closeModalMessage} />
            )}
        </div>
    );
}

export default Reservas;
