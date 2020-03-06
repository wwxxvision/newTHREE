//~~~~~~~ IMPORTS ~~~~~~~//
import '../styles/index.scss';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false;
    this.CAMERA_Z = 5;
    this.camera.position.z = this.CAMERA_Z;
    this.user = new User(localStorage);
    this.controls.target = new THREE.Vector3(0, 0, 0);
  }

  updateTrigger({ x, y, z }) {
    this.controls.target = new THREE.Vector3(x, y, z);
  }

  init() {

    //~~~~~~~ Logic ~~~~~~~//
    let currentPlace = typeof this.user.placement === 'string' ? JSON.parse(this.user.placement) : this.user.placement,
      house = new House(config.app, currentPlace, this.scene);

    house.factoryRoom();

    document.addEventListener('click', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      let intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length) {
        intersects.forEach(intersect => {
          if (intersect.object.name === 'BUTTON') {
            let direction = intersect.object.userData.direction;
            this.user._update(direction);

            house.updatePlacement(direction);
            house.move(direction.position, this.updateTrigger.bind(this), this.CAMERA_Z);

          }
        });
      }

    });
  }
  
  render() {
    requestAnimationFrame(this.render.bind(this));

    this.controls.update();
    this.controls.object.lookAt(this.controls.target)

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




