import React from 'react';
import { Bar } from 'react-chartjs-2';

const CustFreq = ({ data, labels, label, backgroundColor }) => {
    
 const chartData = {
    labels: labels, // ['Visa', 'Master', 'Amex'],
    datasets: [
      {
        label: label, //'Open vs Closed Account'
        data: data, //[visa, master, amex]
        backgroundColor: backgroundColor, //['#FF6384', '#2CA8FF', '#FFCE56'], 
        borderWidth: 1,
      },
    ],
 };

 const options = {
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
        ticks: {
          maxTicksLimit: 7,
        },
        grid: {
          zeroLineColor: "transparent",
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

 return <Bar data={chartData} options={options} />;
};

export default CustFreq;
