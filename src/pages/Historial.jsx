import React, { useState, useEffect } from 'react';
import '../styles/Historial.css';
import Table from '../components/Table';
import Loading from '../components/Loading';
import CardDashboard from '../components/CardDashboard';
import totalIcon from '../assets/total_icon.png';

function Historial() {
    const [reservasCanceladas, setReservasCanceladas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalCanceladas, setTotalCanceladas] = useState(0);
    const limite = 10;

    const columnas = ['Nombre', 'Dni', 'Email', 'Celular', 'Fecha', 'Hora', 'Turno'];

    const obtenerReservasCanceladas = async (pagina = 1) => {
        try {
            const respuesta = await fetch(`https://santamariahoteles.com/torigallo/backend/reservas/get_reservas_canceladas.php?page=${pagina}&limit=${limite}`);
            const data = await respuesta.json();

            if (data.success) {
                setReservasCanceladas(data.reservas_canceladas);
                setTotalCanceladas(data.total);
                const total = data.total;
                const totalPaginas = Math.ceil(total / limite);
                setTotalPaginas(totalPaginas);
            } else {
                console.error('Error al obtener las reservas canceladas:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
        setCargando(false);
    };

    useEffect(() => {
        obtenerReservasCanceladas(paginaActual);
    }, [paginaActual]);

    return (
        <div className='historial-container'>
            <h2>Historial de Reservas Canceladas</h2>
            {cargando ? (
                <Loading />
            ) : (
                <>
                    <CardDashboard 
                        title="Total de Reservas Canceladas" 
                        value={totalCanceladas} 
                        image={totalIcon} 
                        className="pedidos"  
                    />
                    <Table columns={columnas} data={reservasCanceladas} />
                    <div className="pagination">
                        <span>Página {paginaActual} de {totalPaginas}</span>
                        <button onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))} disabled={paginaActual === 1}>
                            Anterior
                        </button>
                        <button onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))} disabled={paginaActual === totalPaginas}>
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Historial;
