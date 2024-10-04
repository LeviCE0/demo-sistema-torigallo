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

  // Filtrar solo los meses que tienen datos
  const labels = monthlySalesData.map(item => meses[parseInt(item.month) - 1]);
  const data = monthlySalesData.map(item => item.total);
  const backgroundColors = monthlySalesData.map((item, index) => colores[parseInt(item.month) - 1]); // Asigna colores por mes

  const chartData = {
    labels: labels, // Usa los meses que tienen datos
    datasets: [
      {
        label: 'Ventas del Mes',
        data: data, // Extrae los totales del arreglo de datos
        backgroundColor: backgroundColors, // Asigna colores a cada barra
        borderColor: 'rgba(0, 0, 0, 0.7)', // Color del borde
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

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
