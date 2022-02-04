import React, { MouseEvent, useEffect, useRef, useState } from 'react';
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
import { Chart, getDatasetAtEvent, getElementAtEvent, Line } from 'react-chartjs-2';
import faker from 'faker';
import PropTypes from 'prop-types';
import DropDown from '../../components/dropdown/dropdown.component';
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

let delayed: boolean;

const roundUp = (n: number) => {
  return Math.round(100*n)/100; 
}

const capitalize = (word: string) => {
  const str = word.toLocaleLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          size: 15
        },
        generateLabels: (chart: any) => {
          console.log("LABELS: ", chart.data);
          var data = chart.data.datasets;
          if (data.length) {
            return data.map(function(label: any, i: number) {
              var meta = chart.getDatasetMeta(0);
              var ds = data[0];
                return {
                fillStyle: label.backgroundColor,
                strokeStyle: label.backgroundColor,
                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                text: capitalize(label.label),
                index: i
              };
            });
          }
          return [];
        }
      }
    },
    tooltip: {
      callbacks: {
        footer: (context: any) => {
          console.log("context: ",context[0])
          const data = context[0];
          const name = `% ${roundUp(data.raw)}`
          const arr = [name];
          return arr;
        }
      }
    }
  },
  scales: {
    yAxes: {
      ticks: {
        callback: function(value: any) {
          return value + '%'
        }
      }
    }
  },
  hitRadius: 30,
  hoverRadius: 5,
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context: any) => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 10 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
};

const LineChart = ({ data }: AppProps) => {
  const chartRef = useRef();

  useEffect(() => {
    const chart: any = chartRef.current;
    chart.reset()
    chart.render()
  })


  const getDisplayData = () => {
    return Object.keys(data.datasets).length === 0
  }
  
  const lineGraph = getDisplayData() ? 
    <p>data is Loading...</p>: 
    <Line 
      ref={chartRef} 
      datasetIdKey='id' 
      options={options} 
      data={data} />
  
  const deleteB = () => {
    const chart: any = chartRef.current;

    const index = chart.data.datasets.findIndex((element: any) => element.label.toLocaleLowerCase() === 'ethereum');
    chart.data.datasets.splice(index, index+1); 

    console.log("Datasets: ", chart.data.datasets)

    chart.update();
  }

  return (
    <div>
        {lineGraph}
        <button onClick={deleteB}>Delete Bitcoin</button>
    </div>
  )
}

type AppProps = {
  data: { labels: Array<any>, datasets: Array<any> },
}

export default LineChart;