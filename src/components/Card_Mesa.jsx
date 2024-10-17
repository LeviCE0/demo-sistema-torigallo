import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';

function Card_Mesa({ id, title, description, onCancel, onCobrar }) {
    const navigate = useNavigate();
    const [status, setStatus] = useState('Disponible'); // Estado inicial

    useEffect(() => {
        const estadoMesa = localStorage.getItem(`estado_mesa_${id}`);
        if (estadoMesa) {
            const { status } = JSON.parse(estadoMesa);
            setStatus(status);
        }
    }, [id]);

    const handleAtender = () => {
        navigate(`/pedido/${id}`);
    };

    return (
        <div className="card">
            <h3>{title}</h3>
            <p><strong>Capacidad: </strong>{description}</p>
            <div className="status-container">
                <p style={{ display: 'inline' }}><strong>Estado:</strong> {status}</p>
                {status === 'Disponible' ? (
                    <div className="button-container">
                        <button className="btn-atender" onClick={handleAtender}>
                            Atender
                        </button>
                    </div>
                ) : status === 'Atendido' ? (
                    <div className="button-container">
                        <button 
                            className="btn-cancelar-atencion" 
                            onClick={onCancel}
                            style={{ backgroundColor: 'red', color: 'white' }}
                        >
                            Cancelar Atención
                        </button>
                        <button 
                            className="btn-cobrar" 
                            onClick={onCobrar}
                            style={{ backgroundColor: 'green', color: 'white', marginLeft: '10px' }}
                        >
                            Cobrar
                        </button>
                    </div>
                ) : (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>No se puede atender</p>
                )}
            </div>
        </div>
    );
}

export default Card_Mesa;
