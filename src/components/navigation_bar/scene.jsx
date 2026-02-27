import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import styles from "./scene.module.css"
export default function Scene() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#5F6161");

        const camera = new THREE.OrthographicCamera(
            0, 24,    // left, right
            24, 0,   // top, bottom
            -1000, 1000
        );

        camera.position.z = 10;
        scene.add(camera)
        camera.position.z = 500;

        // SEARCH ICON GROUP
        const searchIcon = new THREE.Group();

        /* ===== RING ===== */
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(8, 1.2, 16, 100),
            new THREE.MeshBasicMaterial({ color: "0x000000" })
        );
        searchIcon.add(ring);

        /* ===== HANDLE ===== */
        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 10, 24),
            new THREE.MeshBasicMaterial({ color: "0x000000" })
        );
        handle.position.set(6, -6, 0);
        handle.rotation.z = Math.PI / 4;
        searchIcon.add(handle);
        camera.position.x=-11
        camera.position.y=-12
        // ADD TO SCENE
        scene.add(searchIcon);

        const canvas = document.getElementById("draw")

        let renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)

        // const controls = new OrbitControls(camera, renderer.domElement)
        // controls.autoRotate=true
        window.addEventListener("resize", () => {
            renderer.setSize(24, 24)

        })
        let clock = new THREE.Clock()
        function animate() {
            window.requestAnimationFrame(animate)
            searchIcon.rotation.y += 0.02;
            renderer.render(scene, camera)
        }
        animate()

        // Cleanup (VERY IMPORTANT in React)
        return () => {
            renderer.dispose();
            // mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    //   return <div ref={mountRef} />;
    return <>
        <canvas id="draw"></canvas>
        <div ref={mountRef} />
    </>;
}