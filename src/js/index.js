//~~~~~~~ IMPORTS ~~~~~~~//
import '../styles/index.scss';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Creator3d from './creator3d';
import { dispose3d } from './utils';
import config from './config';
import User from './user';
import House from './models/house';
import Room from './models/room';
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
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false;
    this.camera.position.z = 5;
    this.user = new User(localStorage);
    this.controls.target = new THREE.Vector3(0, 0, 0);
  }
  
  init() {
    const preloader = document.querySelector('.preloader');

    let setPreloader = function (type) {
      preloader.style.display = type;
    }


    let house = new House(config.app),
      currentPlace = typeof this.user.placement === 'string' ? JSON.parse(this.user.placement) : this.user.placement,
      creator3d = new Creator3d(),
      scene = this.scene;
  


    class Sphere {
      constructor(placement, type) {
        this.data = new Room(house.selectRoom(placement), type);
        this.mesh = creator3d.createSphere(this.data.RADIUS, this.data.WIDTH, this.data.HEIGHT);
        this.uploadTexture(this.data.room.src, this.mesh);
      }

      setProp(prop, value) {
        this.data[prop] = value;
      }

      uploadTexture(src, _mesh) {
        setPreloader('block');

        new THREE.TextureLoader().load(src,
          function (texture) {
            creator3d.setMaterial(_mesh, texture);
            setPreloader('none');
          });
      }

      move(newPlacement) {
        let _sphere = new Sphere(newPlacement, 'active');
        let oldPos = JSON.parse(JSON.stringify(_sphere.mesh.position));

        scene.add(_sphere.mesh);

        _sphere.mesh.position.z = 1000;

        let _config = {
          xTarg: _sphere.mesh.position.x,
          yTarg: _sphere.mesh.position.y,
          zTarg: _sphere.mesh.position.z
        }

        let config = {
          _xTarg: this.mesh.position.x,
          _yTarg: this.mesh.position.y,
          _zTarg: this.mesh.position.z
        }


        new TWEEN.Tween(_config)
          .to(
            {
              xTarg: this.mesh.position.x,
              yTarg: this.mesh.position.y,
              zTarg: this.mesh.position.z
            }, 1000
          )
          .onUpdate(() => {
            _sphere.mesh.position.z = _config.zTarg;
  
          })
          .start();

        new TWEEN.Tween(config)
          .to(
            {
              _xTarg: oldPos.x,
              _yTarg: oldPos.y,
              _zTarg: oldPos.z
            }, 1500
          )
          .onUpdate(() => {
            this.mesh.position.z = config._zTarg;

          })
          .onComplete(() => {
            dispose3d(scene, [this.mesh]);

            this.data = _sphere.data;
            this.mesh = _sphere.mesh;

            _sphere = null;

          })
          .start();

      }


    }

    let sphere = new Sphere(currentPlace, 'active');
    scene.add(sphere.mesh);



    document.addEventListener('keydown', (e) => {
      if (e.key === 'q') {
        let place = { "name": "bedroom", "subName": "b" }
        sphere.move(place);
      }
    })


  }
  render() {
    requestAnimationFrame(this.render.bind(this));

    this.controls.update();
    this.controls.object.lookAt(this.controls.target)

    // console.log(this.controls.target)

    this.renderer.render(this.scene, this.camera);
    TWEEN.update();
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




