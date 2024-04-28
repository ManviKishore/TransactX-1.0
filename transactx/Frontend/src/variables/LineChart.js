// import React from 'react';
// import { Line } from 'react-chartjs-2';

// const LineChart = ({ labels, data }) => { 

  

//  const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: "Data",
//         data: data,
//         fill: false,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderWidth: 2,
//       },
//     ],
        
//  };

//  const options = {
  
//     options: {
//     layout: {
//       padding: {
//         left: 20,
//         right: 20,
//         top: 0,
//         bottom: 0,
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltips: {
//         backgroundColor: "#fff",
//         titleFontColor: "#333",
//         bodyFontColor: "#666",
//         bodySpacing: 4,
//         xPadding: 12,
//         mode: "nearest",
//         intersect: 0,
//         position: "nearest",
//       },
//     },
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         ticks: {
//           fontColor: "rgba(255,255,255,0.4)",
//           fontStyle: "bold",
//           beginAtZero: true,
//           maxTicksLimit: 5,
//           padding: 10,
//         },
//         grid: {
//           drawTicks: true,
//           drawBorder: false,
//           display: true,
//           color: "rgba(255,255,255,0.1)",
//           zeroLineColor: "transparent",
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//           color: "rgba(255,255,255,0.1)",
//         },
//         ticks: {
//           padding: 10,
//           fontColor: "rgba(255,255,255,0.4)",
//           fontStyle: "bold",
//         },
//       },
//     },
//   },
//   };

//  return (
//     <div>
//       <Line data={chartData} options={options} />
//     </div>
//  );
// };

// export default LineChart;



import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ labels, data }) => {
 const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Data",
        data: data,
        fill: true,
        backgroundColor: 'rgba(24, 206, 15, 0.4)', // Adjusted to match dashboardAllProductsChart
        borderColor: 'rgba(24, 206, 15, 1)', // Adjusted to match dashboardAllProductsChart
        borderWidth: 2,
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#18ce0f",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        tension: 0.4,
      },
    ],
 };

 const options = {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#fff",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          fontColor: "rgba(255,255,255,0.4)",
          fontStyle: "bold",
          beginAtZero: true,
          maxTicksLimit: 5,
          padding: 10,
        },
        grid: {
          drawTicks: true,
          drawBorder: false,
          display: true,
          color: "rgba(255,255,255,0.1)",
          zeroLineColor: "transparent",
        },
      },
      x: {
        grid: {
          display: false,
          color: "rgba(255,255,255,0.1)",
        },
        ticks: {
          padding: 10,
          fontColor: "rgba(255,255,255,0.4)",
          fontStyle: "bold",
        },
      },
    },
    layout: {
      padding: { left: 0, right: 0, top: 15, bottom: 15 },
    },
 };

 return (
    <div>
      <Line data={chartData} options={options} />
    </div>
 );
};

export default LineChart;
