//~~~~~~~ IMPORTS ~~~~~~~//
import TWEEN from 'tween.js';
import * as THREE from 'three';
import { binding } from './utils';
import '../styles/index.scss';
import config from './config';



//~~~~~~~ APP ~~~~~~~//
try {
  class Scene {

    constructor() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(config.camera.fov, config.camera.aspect, config.camera.near, config.camera.far);
      this.renderer = new THREE.WebGLRenderer();

      this.render = this.render.bind(this);
      this.animate = this.animate.bind(this);
    }

    render() {
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      config.render.domElement.appendChild(this.renderer.domElement);
    }

    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    }

    initial() {
      this.render();
      this.animate();
    }

  }

  let scene = new Scene();
  scene.initial();
}

catch (err) {
  console.error('App has some issue and can not run');

  let erroData = `
    <div style="text-align: center; color: red;">
      'App has some issue and can not run.Try later again , please.'
      ${err}
    </div>
  `;

  document.body.innerHTML = erroData;
}




