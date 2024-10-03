import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ monthlySalesData }) => {
  const data = {
    labels: monthlySalesData.map(item => item.month), // Extrae los meses del arreglo de datos
    datasets: [
      {
        label: 'Ventas del Mes',
        data: monthlySalesData.map(item => item.total), // Extrae los totales del arreglo de datos
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
        text: 'Gráfico de Ventas Mensuales',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
