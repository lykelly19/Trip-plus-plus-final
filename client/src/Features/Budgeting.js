import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Legend,
    Tooltip,
    CategoryScale
} from 'chart.js';

ChartJS.register(
    ArcElement,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Legend,
    CategoryScale,
    Tooltip
);

const data = {
    labels: ["Pets", "Hotel", "Ticket", "Traffic"],
    datasets: [
        {
            label: 'Doughnut Chart',
            data: [100, 275, 275, 275],
            borderColor: ["#000000"],
            backgroundColor: ["#12B1D4", "#FF6B4A", "#FFBFF1", '#89FC86' ],
            hoverBackgroundColor: ["#12B1D4", "#FF6B4A", "#FFBFF1", '#89FC86' ]
        }
    ]
};


const options = {
    responsive: true,
    maintainAspectRatio: false
    // set maintainAspectRatio to false to set width & height
};



const Budgeting = () => {
    return (
        <div>
            <Doughnut data={data} options={options} height={400} width={400}/>
        </div>
      )
}

export default Budgeting