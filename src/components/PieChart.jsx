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

    // Colores para cada mes
    const colores = [
        'rgba(255, 99, 132, 0.6)', // Enero
        'rgba(54, 162, 235, 0.6)', // Febrero
        'rgba(210, 146, 86, 0.6)', // Marzo
        'rgba(75, 192, 192, 0.6)', // Abril
        'rgba(153, 102, 255, 0.6)', // Mayo
        'rgba(255, 159, 64, 0.6)', // Junio
        'rgba(140, 80, 112, 0.6)', // Julio
        'rgba(54, 162, 235, 0.6)', // Agosto
        'rgba(255, 206, 86, 0.6)', // Septiembre
        'rgba(75, 192, 192, 0.6)', // Octubre
        'rgba(153, 102, 255, 0.6)', // Noviembre
        'rgba(255, 159, 64, 0.6)', // Diciembre
    ];

    const labels = ordersData.map(order => meses[parseInt(order.mes) - 1]); // -1 porque el índice del arreglo comienza en 0

    const data = ordersData.map(order => parseInt(order.totalPedidos)); // Convierte totalPedidos a número

    // Asigna colores a cada segmento basado en el mes
    const backgroundColors = ordersData.map(order => colores[parseInt(order.mes) - 1]);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Cantidad de Pedidos por Mes',
                data: data,
                backgroundColor: backgroundColors, // Asigna colores por mes
                borderColor: [
                    'rgba(0, 0, 0, 1)', // Color del borde de cada segmento
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
