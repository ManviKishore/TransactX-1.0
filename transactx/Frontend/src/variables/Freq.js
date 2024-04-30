import React from 'react';
import { Bar } from 'react-chartjs-2';

const Freq = ({ open, closed, other }) => {

    
 const chartData = {
    labels: ['Closed', 'Open'],
    datasets: [
      {
        label: 'Open vs Closed Account',
        data: [closed, open, other], 
        backgroundColor: ['#FF6384', '#2CA8FF'], 
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

 return <Bar data={chartData} options={options} />;
};

export default Freq;
