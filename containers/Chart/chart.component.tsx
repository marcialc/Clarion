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

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          size: 15
        }
      }
    },
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

const LineChart = ({ data, displayFilterDropDown = false, listOfItems }: AppProps) => {
  const chartRef = useRef();

  useEffect(() => {
    const chart: any = chartRef.current;
    chart.reset()
    chart.render()
    console.log("USE EFFECT")
  })


  const getDisplayData = () => {
    return Object.keys(data.datasets).length === 0
  }

  const handleRemoveData = () => {
    const chart: any = chartRef.current;

    console.log("chart", chart)
    // chart.update()
    console.log("BUTTON CLICK")
  }
  
  const lineGraph = getDisplayData() ? 
    <p>data is Loading...</p>: 
    <Line 
      ref={chartRef} 
      datasetIdKey='id' 
      options={options} 
      data={data} />

  const dropDown = displayFilterDropDown ?   
    <DropDown list={["bitcoin", "etherrium"]} callback={handleRemoveData} label="Remove Data" minWidth={145}/>
    :<></>;

  return (
    <div>
        {lineGraph}
        {dropDown}
    </div>
  )
}

type AppProps = {
  data: { labels: Array<any>, datasets: Array<any> },
  displayFilterDropDown?: boolean,
  listOfItems?: string[]

}

export default LineChart;