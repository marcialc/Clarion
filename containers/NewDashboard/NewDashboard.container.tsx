import React, { Component } from 'react';
import axios from 'axios';
import DropDown from '../../components/dropdown/dropdown.component';
import LineChart from '../Chart/chart.component';
import styled from 'styled-components';
import AutoFillDropDown from '../../components/autoFillDropDown/autofilldropdown.component';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export class NewDashboard extends Component {

  constructor(props: any) {
    super(props);
  }

  state = {
    data: { labels: [], datasets: [] },
    inputCoin: "",
    selectedCoins: ['ethereum', 'bitcoin', ],
    days: '1',
    listCoins: [],
  }
 
  componentDidMount() {
    // populating with inital selected coins
    this.setChartData();

    // fetching from api list of coins
    const listCoins = [
      "Bitcoin",
      "Ethereum",
      "Cardano",
      "Dogecoin",
      "Polkadot",
      "Helium",
      "Solana"
    ]

    this.setState({ listCoins: listCoins })
  }

  async setChartData() {
    const data  = await this.getChartData();
    setTimeout(() => {
      this.setState({data: data});
    }, 200);
  }


   getChartData = () => {
    const selectedCoins: any[] = this.state.selectedCoins;
    const datasets: any[] = [];
    let label: any[] = [];

    selectedCoins.map(async(coin, index) => {
      const response: any = await fetchCoinData(coin, index === 0, label);
      const color = generateRandomColor();
      datasets.push({
        label: coin.toUpperCase(),
        data: response,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        pointBorderWidth: 0.2,
      })
    })    
    const data = {
      labels: label,
      datasets,
    };
    return data;
  }

  handleInput = (input: string) => {
    const coin: string = input.toLocaleLowerCase();
    const coinList: any[] = this.state.selectedCoins;
    coinList.push(coin)
    this.setState({ inputCoin: coin, selectedCoins: coinList });
    this.setChartData();
  }

  render() {
      const data: { labels: Array<any>, datasets: Array<any> } = this.state.data;
      let chart;
      if(Object.keys(data.labels).length !== 0 || Object.keys(data.datasets).length !== 0){
        chart = <LineChart data={data}/>
      } else {
        chart = <p>loading...</p>
      }

    return (
      <div style={{ width: "100%" }}>
      <AutoFillDropDown list={this.state.listCoins} callback={this.handleInput} label="Cryptos"/>
        <div  style={{ width:"80%", margin: "0 auto" }}>
         {chart} 
        </div>
      </div>
    )
  }
}


const generateRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  //Math.random() 
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

async function fetchCoinData(coin: string, getLabels = false, labels: Array<any>) {
  const xAxis: any[] = [];
  const yAxis: any[] = [];
  axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=2`)
    .then(res => {
        const prices = res.data.prices;
        let basePrice  = 0;
        prices.map((el: any[], i: number) => {
          if(getLabels) {
            const milliseconds = new Date(el[0]);
            const date = milliseconds.toLocaleTimeString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
            const n = i % 2 === 0 ? date: '';
            labels.push(n);
          }

            if(i === 0) basePrice = el[1];
            const value = i === 0 ? 0 : ((el[1]/basePrice)-1)*100;
            xAxis.push(value);
        })
    })
  
  return xAxis;
}