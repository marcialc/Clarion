import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Header } from '../components/Header/Header'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Clarion
        </h1>
      </main>

      <footer className={styles.footer}>
        <p>Powered by Calrion API</p>
      </footer>
    </div>
  )
}

export default Home
