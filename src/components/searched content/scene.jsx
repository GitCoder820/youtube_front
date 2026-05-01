import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import styles from "./scene.module.css"
export default function NotFound() {
  return (
    <div className={styles.notfound}>
      <div className={styles.glitchwrap}>
        <span className={styles.glitchnum} data-text="404">404</span>
      </div>

      <span className={styles.tag}>Video not found</span>
      <h1>You've wandered off the map</h1>
      <p>The video you're looking for doesn't exist or was moved.</p>

      <div className={styles.pathpill}>
        <span className={styles.dot} />
      </div>

    </div>
  );
}