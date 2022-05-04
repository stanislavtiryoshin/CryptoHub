import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './PieChart.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({share}) => {
  const data = {
    labels: ['Bitcoin', 'Other cryptos'],
    datasets: [
      {
        label: 'Market Share',
        data: [share, 100 - share],
        backgroundColor: [
          'rgba(247, 147, 26, 0.5)',
          'rgba(173, 2, 167, 0.5)',
        ],
        borderColor: [
          'rgb(247, 147, 26)',
          'rgb(173, 2, 167)',
        ],
        borderWidth: 2,
      },
    ],
  }
  return (
    <div className="pie-chart">
        <Doughnut data={data} />
    </div>
  )
}

export default PieChart