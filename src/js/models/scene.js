
export default class Scene {
  constructor(THREE, config) {
    this.THREE = THREE;
    this.config = config;
    this.scene = new this.THREE.Scene();
    this.camera = new this.THREE.PerspectiveCamera(this.config.camera.fov, this.config.camera.aspect, 
      this.config.camera.near, this.config.camera.far);
    this.renderer = new this.THREE.WebGLRenderer();
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