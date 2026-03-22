import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import styles from "./scene.module.css"
export default function Scene() {
    const mountRef = useRef(null);

    useEffect(() => {
        /* =======================
           SCENE
        ======================= */
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#0a0a0a");
        
        /* =======================
           CAMERA (ORTHOGRAPHIC / PIXELS)
        ======================= */
        let width = 300;
        let height = 400;
        
        const camera = new THREE.OrthographicCamera(
          -width / 2,
           width / 2,
           height / 2,
          -height / 2,
           0.1,
           1000
        );
        camera.position.z = 100;
        
        /* =======================
           RENDERER
        ======================= */
        const canvas = document.getElementById("draw")
        const renderer = new THREE.WebGLRenderer({ canvas,antialias: true });
        renderer.setSize(width, height);
        // document.body.appendChild(renderer.domElement);
        
        /* =======================
           LIGHTS (IMPORTANT)
        ======================= */
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(200, 300, 400); // angled light
        scene.add(light);
        
        /* =======================
           SPHERE (SOLID)
        ======================= */
        const robot = new THREE.Group();
        scene.add(robot);
        
        const geometrys = new THREE.SphereGeometry(30, 32, 32);
        const material = new THREE.MeshStandardMaterial({
          color: "#82fa75",
          roughness: 0.4,
          metalness: 0.1
        });
        const materialeye = new THREE.MeshStandardMaterial({
          color: "#000000",
          roughness: 0.4,
          metalness: 0.1
        });
        const sphere = new THREE.Mesh(geometrys, material);
        
        const geometryc = new THREE.CapsuleGeometry( 25, 60, 8, 16, 1 );
        
        const capsule = new THREE.Mesh( geometryc, material );
        
        const rhand = new THREE.CapsuleGeometry( 15, 50, 8, 16, 1 );
        
        const righthand = new THREE.Mesh( rhand,material );
        
        const lhand = new THREE.CapsuleGeometry( 15, 50, 8, 16, 1 );
        
        const lefthand = new THREE.Mesh( rhand,material );
        
        const rleg = new THREE.CapsuleGeometry( 15, 50, 8, 16, 1  );
        
        const rightleg = new THREE.Mesh( rleg, material );
        
        const lleg = new THREE.CapsuleGeometry( 15, 50, 8, 16, 1  );
        
        const leftleg = new THREE.Mesh( rleg, material );
        
        const lefte = new THREE.RingGeometry( 2, 5, 32 );
        const lefteye = new THREE.Mesh( lefte, materialeye );
        
        const refte = new THREE.RingGeometry( 2, 5, 32 );
        const righteye = new THREE.Mesh( refte, materialeye );
        //postioning
        
        lefteye.position.set(-15,5,30)
        
        righteye.position.set(15,5,30)
        
        righthand.position.set(60,-50,0)
        
        
        
        righthand.rotation.z=1.6
        
        lefthand.position.set(-60,-50,0)
        lefthand.rotation.z=1.6
        
        rightleg.position.set(-35,-160,0)
        rightleg.rotation.z=-0.5
        
        leftleg.position.set(35,-160,0)
        leftleg.rotation.z=0.5
        
        capsule.position.set(0, -80, 0);
        
        robot.add(righthand)
        robot.add(rightleg)
        robot.add(leftleg)
        robot.add(lefteye)
        robot.add(righteye)
        robot.add(lefthand)
        robot.add(capsule);
        robot.add(sphere);
        
        robot.position.set(0,60,0)
        
        /* =======================
           ANIMATION (VISIBLE ROTATION)
        ======================= */
        function animate() {
          requestAnimationFrame(animate);
          robot.rotation.y += 0.01;
          renderer.render(scene, camera);
        }
        animate();
        
        /* =======================
           RESIZE
        ======================= */
        window.addEventListener("resize", () => {
          width = 300;
          height = 400;
        
          camera.left = -width / 2;
          camera.right = width / 2;
          camera.top = height / 2;
          camera.bottom = -height / 2;
        
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        });

        // Cleanup (VERY IMPORTANT in React)
        return () => {
            renderer.dispose();
            // mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    //   return <div ref={mountRef} />;
    return <>
        <canvas id="draw" className={styles.draw}></canvas>
        <div className={styles.error}>NOT FOUND</div>
        <div ref={mountRef} />
    </>;
}