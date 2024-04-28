import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
 } from 'chart.js';
 
 ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
 );

// const LineChart = ({ labels, data }) => {


//  const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Users per State',
//         data: data,
//         // fill: false,
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 2,
//       },
//     ],
//  };

//  const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Users per State',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//  };

//  return <Bar data={chartData} options={options} />;
// };

// export default LineChart;


// import React from 'react';
// import { Bar } from 'react-chartjs-2';

const BarChart = ({ labels, data }) => {

    // General configuration for the charts with Line gradientStroke
const gradientChartOptionsConfiguration = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
    },
    responsive: 1,
    scales: {
      y: {
        display: 0,
        ticks: {
          display: false,
          maxTicksLimit: 7,
        },
        grid: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
      x: {
        display: 0,
        ticks: {
          display: false,
        },
        grid: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    },
    layout: {
      padding: { left: 0, right: 0, top: 15, bottom: 15 },
    },
  };

 const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Users per State',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        // borderColor: "#f96332",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#f96332",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        // backgroundColor: gradientFill,
        borderWidth: 2,
        tension: 0.4,
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
        text: 'Users per State',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
 };

 return <Bar data={chartData} options={gradientChartOptionsConfiguration} />;
};

export default BarChart;