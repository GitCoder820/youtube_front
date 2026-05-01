import { useEffect, useState } from "react";
import styles from "./ServerWakeScreen.module.css";

export default function ServerWakeScreen({ onReady, apiPath = "/api" }) {
  const [dots, setDots] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState("connecting"); // connecting | retrying | ready

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    const clockTimer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => {
      clearInterval(dotTimer);
      clearInterval(clockTimer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let retryTimeout = null;

    const run = async () => {
      try {
        const res = await fetch(apiPath, { method: "GET" });
        if (!cancelled && res.ok) {
          setStatus("ready");
          setTimeout(onReady, 600);
          return;
        }
      } catch {}
      if (!cancelled) {
        setStatus("retrying");
        setAttempt((a) => a + 1);
        retryTimeout = setTimeout(run, 4000);
      }
    };

    run();

    return () => {
      cancelled = true;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [apiPath, onReady]);

  const formatTime = (s) => {
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  return (
    <div className={styles.root}>
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.card}>
        <div className={`${styles.spinnerWrap} ${status === "ready" ? styles.done : ""}`}>
          <svg className={styles.ring} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="28" stroke="#1e2a38" strokeWidth="4" />
            <circle
              cx="32" cy="32" r="28"
              stroke="url(#grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="88 88"
              className={styles.arc}
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>
            </defs>
          </svg>
          {status === "ready" ? (
            <svg className={styles.check} viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="5 12 10 17 19 7" />
            </svg>
          ) : (
            <span className={styles.spinnerLabel}>{attempt + 1}</span>
          )}
        </div>

        <h1 className={styles.title}>
          {status === "ready" ? "Server ready" : `Waking up${dots}`}
        </h1>

        <p className={styles.sub}>
          {status === "ready"
            ? "All systems go. Loading your app…"
            : "The backend is on Render's free tier and spins down when idle. Give it a moment."}
        </p>

        <div className={styles.barTrack}>
          <div className={`${styles.barFill} ${status === "ready" ? styles.barDone : ""}`} />
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={`${styles.dot} ${status === "retrying" ? styles.dotRetry : ""}`} />
            {status === "ready" ? "Connected" : status === "retrying" ? "Retrying…" : "Connecting…"}
          </span>
          <span className={styles.metaItem}>{formatTime(elapsed)}</span>
        </div>
      </div>

      <p className={styles.hint}>Usually takes 1–2 minutes on first load</p>
    </div>
  );
}