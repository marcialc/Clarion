import type { NextPage } from 'next'
import React from 'react'
import LineChart from '../components/chart/chart.component'
import {Dashboard} from '../containers/Dashboard/dashboard.container'
import { Footer } from '../containers/Footer/Footer'
import { Header } from '../containers/Header/Header'
import { NewDashboard } from '../containers/NewDashboard/NewDashboard.container'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <NewDashboard />
        {/* <LineChart /> */}
      </main>

      <Footer />
    </div>
  )
}

export default Home
