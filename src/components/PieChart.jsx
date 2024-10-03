import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data = {
        labels: ['Ventas Online', 'Ventas Físicas'],
        datasets: [
            {
                label: 'Ventas Totales',
                data: [30000, 15000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
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
                text: 'Distribución de Ventas',
            },
        },
    };

    return (
        <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
