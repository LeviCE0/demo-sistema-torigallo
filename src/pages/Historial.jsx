import React, { useState, useEffect } from 'react';
import '../styles/Historial.css';
import Table from '../components/Table';
import Loading from '../components/Loading';
import CardDashboard from '../components/CardDashboard';
import totalIcon from '../assets/total_icon.png';

function Historial() {
    const [cancelledReservations, setCancelledReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCancelled, setTotalCancelled] = useState(0);
    const limit = 10;

    const columns = ['Nombre', 'Dni', 'Email', 'Celular', 'Fecha', 'Hora', 'Turno'];

    const fetchCancelledReservations = async (page = 1) => {
        try {
            const response = await fetch(`https://santamariahoteles.com/torigallo/backend/reservas/get_reservas_canceladas.php?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data.success) {
                setCancelledReservations(data.reservas_canceladas);
                setTotalCancelled(data.total);
                const total = data.total;
                const totalPages = Math.ceil(total / limit);
                setTotalPages(totalPages);
            } else {
                console.error('Error al obtener las reservas canceladas:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCancelledReservations(currentPage);
    }, [currentPage]);

    return (
        <div className='historial-container'>
            <h2>Historial de Reservas Canceladas</h2>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <CardDashboard 
                        title="Total de Reservas Canceladas" 
                        value={totalCancelled} 
                        image={totalIcon} 
                        className="pedidos"  
                    />
                    <Table columns={columns} data={cancelledReservations} />
                    <div className="pagination">
                        <span>Página {currentPage} de {totalPages}</span>
                        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                            Anterior
                        </button>
                        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Historial;
