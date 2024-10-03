import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ ordersData }) => {
    if (!ordersData || ordersData.length === 0) {
        return <div>No hay datos disponibles para mostrar.</div>;
    }

    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Cambia `order.mes` para usar el nombre del mes
    const labels = ordersData.map(order => meses[parseInt(order.mes) - 1]); // -1 porque el índice del arreglo comienza en 0

    const data = ordersData.map(order => parseInt(order.totalPedidos)); // Convierte totalPedidos a número

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Cantidad de Pedidos por Mes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Distribución de Pedidos por Mes',
            },
        },
    };

    return (
        <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
