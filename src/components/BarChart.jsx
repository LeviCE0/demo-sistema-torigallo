import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ monthlySalesData }) => {
    const labels = monthlySalesData.map(data => data.mes);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Ventas Mensuales',
            data: monthlySalesData.map(data => data.ventas),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Ventas Mensuales',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
