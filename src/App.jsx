import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/home/home'
import styles from './App.module.css'
import Navbar from './components/navigation_bar/navigation_bar'
import Login from './components/login/login'
import Explorer from './components/left_pannel/explorer'
import Video from './components/video/Video'
import ServerWakeScreen from './Wakeup'
import { useNavigate } from 'react-router-dom'
function App() {
  const navigate = useNavigate();
  const [appv, setappv] = useState();
  const [serverReady, setServerReady] = useState(false);
  if (!serverReady) {
    return <ServerWakeScreen serverReady={serverReady} setServerReady={setServerReady} />;
  }
  navigate(`/Home`);
}

export default App;
