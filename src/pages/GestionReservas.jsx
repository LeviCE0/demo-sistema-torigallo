import React, { useState, useEffect } from 'react';
import '../styles/GestionReservas.css';
import Modal from '../components/Modal';
import ModalForm from '../components/ModalForm';
import Loading from '../components/Loading';

function Reservas() {
    const [formData, setFormData] = useState({
        nombre: '',
        dni: '',
        email: '',
        celular: '',
        fecha: '',
        turno: 'tarde',
        capacidad: '',
    });

    const [modalMessage, setModalMessage] = useState('');
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [showModalForm, setShowModalForm] = useState(false);
    const [reservas, setReservas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const columns = ['nombre', 'dni', 'email', 'celular', 'fecha', 'turno', 'mesas'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://santamariahoteles.com/torigallo/backend/verify_mesas.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fecha: formData.fecha,
                    turno: formData.turno,
                    capacidad: formData.capacidad,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.success && data.mesas.length > 0) {
                    const reservaResponse = await fetch('https://santamariahoteles.com/torigallo/backend/create_reservas.php', {
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
                            turno: formData.turno,
                            mesas: data.mesas,
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

    const ReservasTable = () => {
        return (
            <table className="reservas-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>DNI</th>
                        <th>Email</th>
                        <th>Celular</th>
                        <th>Fecha</th>
                        <th>Turno</th>
                        <th>Mesas</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.length > 0 ? (
                        reservas.map((reserva, index) => (
                            <tr key={index}>
                                <td>{reserva.nombre}</td>
                                <td>{reserva.dni}</td>
                                <td>{reserva.email}</td>
                                <td>{reserva.celular}</td>
                                <td>{reserva.fecha}</td>
                                <td>{reserva.turno}</td>
                                <td>{reserva.mesas ? reserva.mesas : 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No hay reservas disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    };

    const fetchReservas = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://santamariahoteles.com/torigallo/backend/get_reservas.php');
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

    useEffect(() => {
        fetchReservas();
    }, []);

    return (
        <div className="reservas-container">
            <h2>Gestión de Reservas</h2>
            {isLoading ? (
                <Loading />
            ) : (
                <ReservasTable columns={columns} data={reservas} />
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
