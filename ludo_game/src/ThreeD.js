import React, { useEffect } from "react";
import * as THREE from "three";

const ThreeD = () => {
  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300); // Set the size of the renderer
    renderer.setClearColor(0x000000, 0); // Make the renderer's background transparent
    const svgContainer = document.getElementById("svg-container");
    svgContainer.appendChild(renderer.domElement);

    // Create a 3D arrow shape for the dropdown marker
    const geometry = new THREE.ConeGeometry(0.3, 1, 4); // Cone geometry to represent the arrow
    const material = new THREE.MeshBasicMaterial({ color: 'red' });
    const marker = new THREE.Mesh(geometry, material);
    scene.add(marker);

    // Set up marker rotation animation
    const animate = () => {
      requestAnimationFrame(animate);

      marker.rotation.x += 0;
      marker.rotation.y += 0;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener("resize", () => {
      const newWidth = svgContainer.clientWidth;
      const newHeight = svgContainer.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    });
  }, []);

  return (
    <div id="svg-container" style={{ border: "1px solid black" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="400"
        height="400"
        viewBox="0 0 400 400"
      ></svg>
    </div>
  );
};

export default ThreeD;
