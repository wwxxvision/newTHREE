import * as THREE from 'three';

export default class Scene {
  constructor(config) {
    this.scene = new THREE.Scene();
    this.config = config;
    this.camera = new THREE.PerspectiveCamera(this.config.camera.fov, this.config.camera.aspect, 
      this.config.camera.near, this.config.camera.far);
    this.renderer = new THREE.WebGLRenderer();
    this.domElement = this.config.render.domElement;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.domElement.appendChild(this.renderer.domElement);

    this.render = this.render.bind(this);
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }


}