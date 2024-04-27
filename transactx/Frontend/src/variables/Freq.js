import React from 'react';
import { Bar } from 'react-chartjs-2';

const Freq = ({ open, closed }) => {

    
 const chartData = {
    labels: ['Closed', 'Open'],
    datasets: [
      {
        label: 'Open vs Closed Account',
        data: [open, closed], 
        backgroundColor: ['#2CA8FF', '#FF6384'], 
        borderWidth: 1,
      },
    ],
 };

 const options = {


 };

 return <Bar data={chartData} options={options} />;
};

export default Freq;
