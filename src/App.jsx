import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/home/home'
import styles from './App.module.css'
import Navbar from './components/navigation_bar/navigation_bar'
import Explorer from './components/left_pannel/explorer'
function App() {
  const [vdata, setVdata] = useState("hi");
  return (
    < div className={styles.app}>
        <nav><Navbar /></nav>
        <div className={styles.main}><Explorer />
          <div className={styles.content}><Home /></div>
        </div>
    </div>
  )

}

export default App;
