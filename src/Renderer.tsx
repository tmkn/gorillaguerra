import React, { useState, useEffect } from "react";
import * as THREE from "three";

var camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.Renderer;
var geometry: THREE.Geometry, material: THREE.Material, mesh: THREE.Mesh;

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

export const Renderer: React.FC = () => {
    useEffect(() => {
        init();
        animate();
        window.addEventListener("resize", onWindowResize, false);

        return () => window.removeEventListener("resize", onWindowResize);
    }, []);
    return null;
};
