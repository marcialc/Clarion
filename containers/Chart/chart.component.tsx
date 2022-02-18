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


import styles from '../../styles/chart.module.scss'
import { createGzip } from 'zlib';
import { ContentCopy } from '@mui/icons-material';

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

let xAxis = 0;

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
      // position: 'top' as const,
      // labels: {
      //   font: {
      //     size: 15
      //   },
      //   generateLabels: (chart: any) => {
      //     console.log("LABELS: ", chart.data);
      //     var data = chart.data.datasets;
      //     if (data.length) {
      //       return data.map(function(label: any, i: number) {
      //         var meta = chart.getDatasetMeta(0);
      //         var ds = data[0];
      //           return {
      //           fillStyle: label.backgroundColor,
      //           strokeStyle: label.backgroundColor,
      //           hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
      //           text: capitalize(label.label),
      //           index: i
      //         };
      //       });
      //     }
      //     return [];
      //   }
      // }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      cornerRadius: 6,
      boxPadding: 5,
      callbacks: {
        label: (coin: any) => {
          const percentage = `% ${roundUp(coin.raw)}`
          return `${capitalize(coin.dataset.label)}: ${percentage}`;
        },
        labelPointStyle: function(context: any) {
          return {
              pointStyle: 'triangle',
              rotation: 0
          };
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
  interaction: {
    mode: 'index',
    axis: 'x'
  },
  // onHover: function(el: any){
  //   // console.log("Element: ",el.x)
  //   // xAxis = el.x;
  // },
  hitRadius: 30,
  pointRadius: 0,
  pointHoverRadius: 5,
  pointHitRadius: 7,
  hoverBackgroundColor: 'white',
  pointHoverBorderWidth: 3,
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

// lines plugin
const lines = {
  id: 'lines',
  beforeDatasetsDraw(chart: any) {
    const { ctx, legend, tooltip, scales: {x, y}, 
    chartArea: {top, bottom, left, right, width, height }} = chart;
    
    // hover lines
    if(tooltip._active[0]) {
      ctx.beginPath();
      ctx.strokeStyle = 'grey';
      ctx.lineWidth = 1;
      ctx.moveTo(tooltip._active[0].element.x, top);
      ctx.lineTo(tooltip._active[0].element.x, bottom);
      // ctx.moveTo(xAxis, top);
      // ctx.lineTo(xAxis, bottom);
      ctx.stroke();
      ctx.restore();
    }
  }
}

// plugin config
const plugins = [lines]

const LineChart = ({ data, list, deleteCallback }: AppProps) => {
  const chartRef = useRef();

  const [legenItems, setlegenItems] = useState([{}]);

  useEffect(() => {
    // const chart: any = chartRef.current;

    // updateLegend();
    // chart.reset()
    // chart.render()

  }, [legenItems])

  const updateLegend = () => {
    const legengs: any[] = [];

    data.datasets.map((el: any) => {
      legengs.push({
        name: el.label,
        color: el.backgroundColor
      })
    })    

    setlegenItems(legengs)
  }


  const getDisplayData = () => {
    return Object.keys(data.datasets).length === 0
  }
  
  const lineGraph = getDisplayData() ? 
    <p>data is Loading...</p>: 
    <Line 
      ref={chartRef} 
      datasetIdKey='id' 
      options={options} 
      plugins={plugins}
      data={data} />
  
  const deleteB = (e: any, coin: string) => {
    console.log("Delete COIN");
    e.stopPropagation();
    const chart: any = chartRef.current;

    const dataset: any = chart.data.datasets.filter((el: any) => {
      return el.label.toLocaleLowerCase() !== coin.toLocaleLowerCase();
    })

    chart.data.datasets = dataset;

    deleteCallback(coin);

    chart.update();
    updateLegend();

  }

  const hideCoin = () => {

  }

  return (
    <div>
        {lineGraph}
        <div style={{ display:'flex', flexDirection:'column' }}>
          {/* {
            list.map( res => {
              return (
                <div onClick={() => console.log("CLICKED coin")} key={res} style={{ backgroundColor: "#fffff" }}  className={styles.tooltip}>
                  <p>{res}</p>
                  <button onClick={(e)=> deleteB(e, res)}>X</button>
                </div>
              )
            })
          } */}
          {
            list.map( (res: any) => {
              return (
                <div onClick={() => console.log("CLICKED coin")} key={res} style={{ backgroundColor: "white" }}  className={styles.tooltip}>
                  <p>{res}</p>
                  <button onClick={(e)=> deleteB(e, res)}>X</button>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

type AppProps = {
  data: { labels: Array<any>, datasets: Array<any> },
  deleteCallback: (item: string) => void,
  list: Array<any>
}

export default LineChart;