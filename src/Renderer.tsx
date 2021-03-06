import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.Renderer;
let monkey: THREE.Group;

const loader: OBJLoader = new OBJLoader();

function init() {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    loader.load(
        `./monkey.obj`,
        obj => {
            monkey = obj;
            obj.scale.set(0.1, 0.1, 0.1);

            obj.traverse(child => {
                console.log(child);

                if (child instanceof THREE.Mesh) child.material = new THREE.MeshNormalMaterial();
            });

            scene.add(obj);
        },
        onProgress => console.log(onProgress),
        error => console.log(error)
    );
}

function animate() {
    requestAnimationFrame(animate);

    checkViewport();

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function checkViewport() {
    try {
        camera.updateMatrix();
        camera.updateMatrixWorld();
        const frustum = new THREE.Frustum();
        frustum.setFromProjectionMatrix(
            new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
        );

        const pos = monkey.position;
        if (!frustum.containsPoint(pos)) {
            console.log(`outside viewport`);
        }
    } catch (e) {
        console.log(e);
    }
}

export const Renderer: React.FC = () => {
    useEffect(() => {
        init();
        animate();
        window.addEventListener("resize", onWindowResize, false);
        window.addEventListener("keydown", e => {
            if (e.key === "d") monkey.translateOnAxis(new THREE.Vector3(1, 0, 0), 0.1);
            else if (e.key === "a") monkey.translateOnAxis(new THREE.Vector3(-1, 0, 0), 0.1);
            else if (e.key === "w") monkey.translateOnAxis(new THREE.Vector3(0, 0, -1), 0.1);
            else if (e.key === "s") monkey.translateOnAxis(new THREE.Vector3(0, 0, 1), 0.1);
            else if (e.key === "q") monkey.translateOnAxis(new THREE.Vector3(-1, 0, 0), 1.5);

            const {height, width} = viewport(camera, 1 /*monkey.position.distanceTo(camera.position)*/);

            console.log(`Height: ${height} | Width: ${width}`);
        });

        return () => window.removeEventListener("resize", onWindowResize);
    }, []);
    return null;
};


interface IViewport {
    width: number;
    height: number;
}

function viewport(camera: THREE.PerspectiveCamera, distance: number): IViewport {
    const vFOV = THREE.MathUtils.degToRad( camera.fov ); // convert vertical fov to radians
    const height = 2 * Math.tan( vFOV / 2 ) * distance; // visible height
    const width = height * camera.aspect;           // visible width

    return {
        height,
        width
    }
}