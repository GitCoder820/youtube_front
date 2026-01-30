import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/home/home'
import styles from './App.module.css'
import Navbar from './components/navigation_bar/navigation_bar'
import Login from './components/login/login'
import Explorer from './components/left_pannel/explorer'
import Video from './components/video/Video'
function App() {
  const [appv,setappv]=useState();
  // useEffect(() => {
  //         localStorage.setItem("login", "Login");
  //     }, []);
  return (
    < div className={styles.app}>
        <nav className={styles.nav}><Navbar /></nav>
        <div className={styles.main}>
          <div className={styles.content}><Home setappv={setappv}/></div>
          <div className={styles.explorer}><Explorer /></div>
        </div>
    </div>
  )

}

export default App;
