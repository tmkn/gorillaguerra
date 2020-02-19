import React, { useState, useEffect } from "react";
import * as THREE from "three";

var camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.Renderer;
var geometry: THREE.Geometry, material: THREE.Material, mesh: THREE.Mesh;

const deg2rad = (Math.PI * 2) / 360;

function init() {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 10);
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

function distanceTest() {
    const distance = mesh.position.distanceTo(camera.position);
    const frustumHeight = 2.0 * distance * Math.tan(camera.fov * 0.5 * deg2rad);
    const frustumWidth = frustumHeight * camera.aspect;

    console.log(`width`, frustumWidth);
    console.log(`height`, frustumHeight);
}

function animate() {
    requestAnimationFrame(animate);

    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;
    checkViewport();

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function checkViewport() {
    camera.updateMatrix();
    camera.updateMatrixWorld();
    const frustum = new THREE.Frustum();
    frustum.setFromProjectionMatrix(
        new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    );

    const pos = mesh.position;
    if (!frustum.containsPoint(pos)) {
        console.log(`outside viewport`);
    }
}

export const Renderer: React.FC = () => {
    useEffect(() => {
        init();
        animate();
        window.addEventListener("resize", onWindowResize, false);
        window.addEventListener("keydown", e => {
            //console.log(`sdf`);
            if (e.key === "d") mesh.translateOnAxis(new THREE.Vector3(1, 0, 0), 0.1);
            else if (e.key === "a") mesh.translateOnAxis(new THREE.Vector3(-1, 0, 0), 0.1);
            else if (e.key === "w") mesh.translateOnAxis(new THREE.Vector3(0, 0, -1), 0.1);
            else if (e.key === "s") mesh.translateOnAxis(new THREE.Vector3(0, 0, 1), 0.1);

            distanceTest();
        });

        return () => window.removeEventListener("resize", onWindowResize);
    }, []);
    return null;
};
