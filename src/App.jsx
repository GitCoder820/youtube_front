import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/home/home'
import styles from './App.module.css'
import Navbar from './components/navigation_bar/navigation_bar'
import Login from './components/login/login'
import Explorer from './components/left_pannel/explorer'
import Video from './components/video/Video'
// import ServerWakeScreen from './Wakeup'

function ServerWakeScreen({ onReady }) {
  const [dots, setDots] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    const clockTimer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => { clearInterval(dotTimer); clearInterval(clockTimer); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const ping = async () => {
      try {
        const res = await fetch(`/api`, { method: "GET" });
        if (!cancelled && res.ok) { onReady(); return; }
      } catch {}
      if (!cancelled) {
        setAttempt((a) => a + 1);
        setTimeout(ping, 4000);
      }
    };
    ping();
    return () => { cancelled = true; };
  }, [onReady]);

  return (
    <div className={styles.wakescreen}>
      <div className={styles.wakecard}>
        <div className={styles.wakepulsering}>
          <div className={styles.wakepulseinner} />
        </div>
        <h2 className={styles.waketitle}>Waking up the server{dots}</h2>
        <p className={styles.wakesub}>
          Our backend is hosted on Render's free tier and goes to sleep when idle.
          This usually takes <strong>1-2 minutes</strong>.
        </p>
        <div className={styles.wakeprogresstrack}>
          <div className={styles.wakeprogressfill} />
        </div>
        <div className={styles.wakemeta}>
          <span>Attempt {attempt + 1}</span>
          <span>{elapsed}s elapsed</span>
        </div>
      </div>
    </div>
  );
}



function App() {
  const [appv, setappv] = useState();
  const [serverReady, setServerReady] = useState(false);
  // useEffect(() => {
  //         localStorage.setItem("login", "Login");
  //     }, []);
  if (!serverReady) {
    return <ServerWakeScreen onReady={() => setServerReady(true)} />;
  }
  return (
    <div className={styles.app}>
      <nav className={styles.nav}><Navbar /></nav>
       <div className={styles.main}>
          <div className={styles.content}><Home setappv={setappv}/></div>
          <div className={styles.explorer}><Explorer /></div>
        </div>
    </div>
  );
}

export default App;
