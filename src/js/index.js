//~~~~~~~ IMPORTS ~~~~~~~//
import '../styles/index.scss';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Creator3d from './creator3d';
import config from './config';
import User from './user';
import House from './models/house';
import Room from './models/room';
import TWEEN from 'tween.js';


//~~~~~~~ APP ~~~~~~~//

class App {
  constructor() {
    this.scene = new THREE.Scene(); //Create instance Scene 
    this.camera = new THREE.PerspectiveCamera(config.camera.fov, config.camera.aspect,
      config.camera.near, config.camera.far);  //Create Perspective camera
    this.renderer = new THREE.WebGLRenderer(); // Create instance render
    this.domElement = config.render.domElement;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.domElement.appendChild(this.renderer.domElement);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minPolarAngle = 0; // radians
    this.controls.maxPolarAngle = Math.PI; // radians
    this.camera.position.z = 5;
    this.user = new User(localStorage);
  }
  init() {
    let house = new House(config.app),
      creator3d = new Creator3d(),
      roomData = house.selectRoom(this.user.placement),
      activeRoom = new Room(roomData, 'active'),
      hiddenRoom = new Room(roomData, 'hidden');

    let activeMesh = creator3d.createSphere(activeRoom.RADIUS, activeRoom.WIDTH,
      activeRoom.HEIGHT, new THREE.TextureLoader().load(activeRoom.room.src)),
      hiddenMesh = creator3d.createSphere(hiddenRoom.RADIUS, hiddenRoom.WIDTH,
        hiddenRoom.HEIGHT, null);

    activeMesh.userData = activeRoom; hiddenMesh.userData = hiddenRoom;

    [activeMesh, hiddenMesh].forEach(mesh => mesh.material.opacity = mesh.userData.opacity);

    activeRoom.factoryButtons();

    let buttons = [];

    activeRoom.instancesOfButton.forEach((button, i) => {
      console.log(button)
      let mesh = creator3d.createBox(button.WIDTH, button.HEIGHT, button.DEPTH);
      mesh.userData = { ...button, id: i };
      mesh.position.x = button.x; mesh.position.y = button.y; mesh.position.z = button.z;

      buttons.push(mesh);

      this.scene.add(mesh);
    });

    this.scene.add(activeMesh, hiddenMesh);


  }
  render() {
    requestAnimationFrame(this.render.bind(this));

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}



let app = new App();

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




