import React, { Component } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels: string[] = [];

const x: any[] = [];

axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1')
.then(res => {
    const prices = res.data.prices;
    prices.map((el: any[]) => {
        x.push(Math.floor(el[1]));
        const milliseconds = new Date(el[0]);
        const date = milliseconds.toLocaleString();
        labels.push(date);
    })
})

export const data = {
  labels,
  datasets: [
    {
      label: 'Bitcoin',
      data:x,
      borderColor: 'rgb(0, 97, 255)',
      backgroundColor: 'transparent',
    },
  ],
};

export class Dashboard extends Component {

  render() {
      console.log(data.datasets)
    return <Line options={options} data={data} />;
  }
}
