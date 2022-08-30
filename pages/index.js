import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Tasks from './Tasks'
import Login from './Login'

export default function Home() {
  return (
    <>
      {/* <Login/> */}
      <Tasks/>
    </>
  )
}
