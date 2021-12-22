import type { NextPage } from 'next'
import React from 'react'
import {Dashboard} from '../containers/Dashboard/dashboard.container'
import { Footer } from '../containers/Footer/Footer'
import { Header } from '../containers/Header/Header'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Clarion
        </h1>
        <Dashboard />
      </main>

      <Footer />
    </div>
  )
}

export default Home
