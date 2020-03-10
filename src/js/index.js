//~~~~~~~ IMPORTS ~~~~~~~//
import '../styles/index.scss';
import * as THREE from 'three';
import config from './config';
import User from './user';
import House from './models/house';
import TWEEN from 'tween.js';


//~~~~~~~ APP ~~~~~~~//
class App {
  constructor() {
    this.scene = new THREE.Scene(); //Create instance Scene 
    this.camera = new THREE.PerspectiveCamera(config.camera.fov, config.camera.aspect, config.camera.near, config.camera.far);  //Create Perspective camera
    this.renderer = new THREE.WebGLRenderer(); // Create instance render
    this.domElement = config.render.domElement;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.domElement.appendChild(this.renderer.domElement);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.camera.rotateY(Math.PI)
    this.isUserInteracting = false;
    this.onMouseDownMouseX = 0;
    this.onMouseDownMouseY = 0;
    this.lon = 0;
    this.onMouseDownLon = 0;
    this.lat = 0;
    this.onMouseDownLat = 0;
    this.phi = 0;
    this.theta = 0;
    this.camera.target = new THREE.Vector3(0, 0, 0);
    this.user = new User(localStorage);
  }

  updateTrigger({ x, y, z }) {
    this.setTargetPos(x, y, z);
  }

  switchControls(mode) {

  }

  onPointerStart(event) {

    this.isUserInteracting = true;

    let clientX = event.clientX,
      clientY = event.clientY;

    this.onMouseDownMouseX = clientX;
    this.onMouseDownMouseY = clientY;

    this.onMouseDownLon = this.lon;
    this.onMouseDownLat = this.lat;
  }

  setTargetPos(x, y, z) {
    this.camera.target.set(x, y, z);
  }

  onPointerMove(event) {

    let clientX = event.clientX,
      clientY = event.clientY;

    if (this.isUserInteracting === true) {

      this.lon = (this.onMouseDownMouseX - clientX) * 0.1 + this.onMouseDownLon;
      this.lat = (clientY - this.onMouseDownMouseY) * 0.1 + this.onMouseDownLat;

      this.lat = Math.max(- 85, Math.min(85, this.lat));
      this.phi = THREE.MathUtils.degToRad(90 - this.lat);
      this.theta = THREE.MathUtils.degToRad(this.lon);
  
      this.setTargetPos((Math.sin(this.phi) * Math.cos(this.theta)), Math.cos(this.phi), (Math.sin(this.phi) * Math.sin(this.theta)));
    }

  }

  onPointerUp() {
    this.isUserInteracting = false;
  }

  cameraUpdate() {

    // this.lat = Math.max(- 85, Math.min(85, this.lat));
    // this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    // this.theta = THREE.MathUtils.degToRad(this.lon);

    // this.camera.target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    // this.camera.target.y = 500 * Math.cos(this.phi);
    // this.camera.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);


  }

  init() {

    //~~~~~~~ Logic ~~~~~~~//
    let currentPlace = typeof this.user.placement === 'string' ? JSON.parse(this.user.placement) : this.user.placement,
      house = new House(config.app, currentPlace, this.scene);

    house.factoryRoom();

    document.addEventListener('mousedown', this.onPointerStart.bind(this), false);
    document.addEventListener('mousemove', this.onPointerMove.bind(this), false);
    document.addEventListener('mouseup', this.onPointerUp.bind(this), false);

    document.addEventListener('touchstart', this.onPointerStart.bind(this), false);
    document.addEventListener('touchmove', this.onPointerMove.bind(this), false);
    document.addEventListener('touchend', this.onPointerUp.bind(this), false);

    document.addEventListener('click', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      let intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length) {
        intersects.forEach(intersect => {
          if (intersect.object.name === 'BUTTON') {
            this.switchControls('off');

            let direction = intersect.object.userData.direction,
              buttonPOS = {
                x: intersect.object.userData.x,
                y: intersect.object.userData.y,
                z: intersect.object.userData.z
              }

            this.user._update(direction);

            house.updatePlacement(direction);
            house.move(direction.position, this.updateTrigger.bind(this), buttonPOS, this.camera.target, this.switchControls.bind(this));

          }
        });
      }

    });
  }

  render() {

    this.camera.lookAt(this.camera.target);
    requestAnimationFrame(this.render.bind(this));

    this.renderer.render(this.scene, this.camera);
    TWEEN.update();
  }
}

const app = new App();

app.render(); app.init();
// }

// catch (err) {
//   console.error(`App has some issue and can not run ${err}`);

//   let erroData = `
//     <div style="text-align: center; color: red;">
//       'App has some issue and can not run.Try later again , please.'
//       ${err}
//     </div>
//   `;

//   document.body.innerHTML = erroData;
// }




