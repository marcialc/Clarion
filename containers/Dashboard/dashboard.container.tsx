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
import CustomizedSelects from '../../components/dropdown/dropdown.component';
import DropDown from '../../components/dropdown/dropdown.component';

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
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          size: 20
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

export class Dashboard extends Component {

  constructor(props: any) {
    super(props);
  }

  state = {
    data: {},
    coin: "ethereum",
    inputCoin: "",
    displayCoins: ['ethereum', 'bitcoin', ],
    days: '1',
    listCoins: [],
    ready: false,
  }
 
  componentDidMount() {
    this.fetchDataList();

    const listCoins = [
      "Bitcoin",
      "Ethereum",
      "Cardano",
      "Dogecoin",
      "Polkadot",
      "Helium"
    ]

    this.setState({ listCoins: listCoins })
  }

  componentDidUpdate() {
    console.log('COMPONENT UPDARTED.......')
    // if(!this.state.ready) this.setState({ ready: true })
  }

  fetchNewCoin(coin: string) {
    this.setState({ ready: false })
    const data = {...this.state.data};
    // const coin = this.state.inputCoin;
    const days: string = this.state.days;

    console.log("Input coin:", coin)

    const x: any[] = [];
      axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`)
      .then(res => {
          const prices = res.data.prices;
          let basePrice  = 0;
          prices.map((el: any[], i: number) => {
              if(i === 0) basePrice = el[1];
              const value = i === 0 ? 0 : ((el[1]/basePrice)-1)*100;
              x.push(value);
          })
      })

      const color = this.generateRandomColor();


      (data as any).datasets.push({
        label: coin.toUpperCase(),
        data: x,
        borderColor: color,
        backgroundColor: color,
        tension: 0.4
      })
      
      this.setState({ data: data })
      setTimeout(() => {
        this.setState({ ready: true })
      }, 200);

  }
 
  fetchDataList() {
    const displayCoins: any[] = this.state.displayCoins;
    const days: string = this.state.days;
    const dataSets: any[] = [];
    const labels: any[] = [];

    console.log("Fetching data list.....")

    displayCoins.map((el, index) => {
      const x: any[] = [];
      axios.get(`https://api.coingecko.com/api/v3/coins/${el}/market_chart?vs_currency=usd&days=${days}`)
      .then(res => {
          const prices = res.data.prices;
          let basePrice  = 0;
          prices.map((el: any[], i: number) => {

              if(i === 0) basePrice = el[1];
              const value = i === 0 ? 0 : ((el[1]/basePrice)-1)*100;

              if(index === 0) {
                const milliseconds = new Date(el[0]);
                const date = milliseconds.toLocaleString();
                labels.push(date);
              }

              x.push(value);
          })
      })

      const color = this.generateRandomColor();
      dataSets.push({
        label: el.toUpperCase(),
        data: x,
        borderColor: color,
        backgroundColor: color,
        tension: 0.4
      })
    })

    const data = {
      labels,
      datasets: dataSets,
    };



    this.setState({ data: data })

    setTimeout(() => {
      this.setState({ ready: true })
    }, 200);

    // this.dataPromise.then((data) => {
    //   console.log("DATA: ", data);
    //   this.setState({ data: data })
    //   return true;
    // }).then(res => {
    //   console.log("SUCCESS: ",res);
    //   setTimeout(() => {
    //     this.setState({ ready: true })
    //   }, 100);bcvbcvbcvbcvbcvb
    // })


  }

  // dataPromise = new Promise((resolve, reject) => {
  //   const displayCoins: any[] = this.state.displayCoins;
  //   const days: string = this.state.days;
  //   const dataSets: any[] = [];
  //   const labels: any[] = [];
    

  //   console.log("HERE displayCoins: ", displayCoins)

  //   displayCoins.map(async(el, index) => {
  //     const x: any[] = [];
  //     axios.get(`https://api.coingecko.com/api/v3/coins/${el}/market_chart?vs_currency=usd&days=${days}`)
  //     .then(res => {
  //         const prices = res.data.prices;
  //         let basePrice  = 0;
  //         prices.map((el: any[], i: number) => {

  //             if(i === 0) basePrice = el[1];
  //             const value = i === 0 ? 0 : ((el[1]/basePrice)-1)*100;

  //             if(index === 0) {
  //               const milliseconds = new Date(el[0]);
  //               const date = milliseconds.toLocaleString();
  //               labels.push(date);
  //             }

  //             x.push(value);
  //         })
  //     })

  //     const color = this.generateRandomColor();
  //     dataSets.push({
  //       label: el.toUpperCase(),
  //       data: x,
  //       borderColor: color,
  //       backgroundColor: color,
  //     })
  //   })

  //   const data = {
  //     labels,
  //     datasets: dataSets,
  //   };

  //   resolve(data);

  // })

  // fetchChartData() {
  //   const displayCoins: any[] = this.state.displayCoins;
  //   const days: string = this.state.days;
  //   const dataSets: any[] = [];
  //   const labels: any[] = [];

  //   console.log("displayCoins: ", displayCoins)

  //   displayCoins.map(async(el, index) => {
  //     const x: any[] = [];
  //     axios.get(`https://api.coingecko.com/api/v3/coins/${el}/market_chart?vs_currency=usd&days=${days}`)
  //     .then(res => {
  //         const prices = res.data.prices;
  //         let basePrice  = 0;
  //         prices.map((el: any[], i: number) => {

  //             if(i === 0) basePrice = el[1];
  //             const value = i === 0 ? 0 : ((el[1]/basePrice)-1)*100;

  //             if(index === 0) {
  //               const milliseconds = new Date(el[0]);
  //               const date = milliseconds.toLocaleString();
  //               labels.push(date);
  //             }

  //             x.push(value);
  //         })
  //     })

  //     const color = this.generateRandomColor();
  //     dataSets.push({
  //       label: el.toUpperCase(),
  //       data: x,
  //       borderColor: color,
  //       backgroundColor: color,
  //       tension: 1
  //     })
  //   })

  //   const data = {
  //     labels,
  //     datasets: dataSets,
  //   };

  //   return data;
  // }

  handleInput = (input: string) => {
    const coin: string = input.toLocaleLowerCase();
    const coinList: any[] = this.state.displayCoins;
    coinList.push(coin)
    console.log(coinList)
    this.setState({ inputCoin: coin, displayCoins: coinList });
    // this.fetchDataList();
    this.fetchNewCoin(coin);
  }

  generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    //Math.random() 
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
      const data: {} = this.state.data;

      let chart;

      if(this.state.ready){
        chart = <Line options={options} data={this.state.data as any} width={400} height={200}/>
      } else {
        chart = <p>loading</p>
      }

    return (
      <div style={{ width:"100%" }}>
      <DropDown list={this.state.listCoins} callback={this.handleInput} />
        <div  style={{ width:"100%" }}>
         {chart} 
        </div>
      </div>
    )
  }
}


// <Line options={options} data={this.state.data as any} />;