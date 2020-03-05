
import * as THREE from 'three';
import config from '../config';

export default class RenderingContext {
  constructor(scene, camera, renderer, controls) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = controls;
  }

  static getDefault() {
    const scene = new THREE.Scene(); //Create instance Scene 
    const camera = new THREE.PerspectiveCamera(config.camera.fov, config.camera.aspect,
      config.camera.near, config.camera.far);  //Create Perspective camera
    const renderer = new THREE.WebGLRenderer(); // Create instance render
    const domElement = config.render.domElement;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    domElement.appendChild(renderer.domElement);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.minPolarAngle = 0; // radians
    controls.maxPolarAngle = Math.PI; // radians
    camera.position.z = 5;

    return new RenderingContext(scene, camera, renderer, controls);
  }
}