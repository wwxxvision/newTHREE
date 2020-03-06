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
    this.camera.rotateY(Math.PI)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false;
    this.camera.position.z = 5;
    this.user = new User(localStorage);
    this.controls.target = new THREE.Vector3(0, 0, 0);
  }

  init() {
    //~~~~~~~ Constants ~~~~~~~//

    const preloader = document.querySelector('.preloader');
    //~~~~~~~ Functions ~~~~~~~//

    function setPreloader(type) {
      preloader.style.display = type;
    }

    function updateTarget({ x, y, z }) {

      this.controls.target = new THREE.Vector3(x, y, z);
    }

    //~~~~~~~ Logic ~~~~~~~//

    let house = new House(config.app),
      currentPlace = typeof this.user.placement === 'string' ? JSON.parse(this.user.placement) : this.user.placement,
      creator3d = new Creator3d(),
      scene = this.scene,
      scenebuttons = [];

    class Sphere {
      constructor(placement, type) {
        this.data = new Room(house.selectRoom(placement), type);
        this.buttons = [];
        this.mesh = creator3d.createSphere(this.data.RADIUS, this.data.WIDTH, this.data.HEIGHT);
        this.uploadTexture(this.data.room.src, this.mesh).then(() => this.initButtons());
        this.mesh.position.set(0, 0, 0);
        this.mesh.rotateY(this.data.room.rotate);
      }

      initButtons() {
        this.data.factoryButtons();

        if (this.data.instancesOfButton.length) {
          this.data.instancesOfButton.forEach(button => {
            let mesh = creator3d.createBox(button.WIDTH, button.HEIGHT, button.DEPTH);

            mesh.userData = button;
            mesh.position.set(button.x, button.y, button.z);
            scene.add(mesh);

            scenebuttons.push(mesh);
          });
        }


      }

      clearButtons() {
        dispose3d(scene, scenebuttons);
        this.data.instancesOfButton = [];
      }

      setProp(prop, value) {
        this.data[prop] = value;
      }

      uploadTexture(src, _mesh) {
        return new Promise(resolve => {
          setPreloader('block');

          new THREE.TextureLoader().load(src,
            function (texture) {
              resolve(creator3d.setMaterial(_mesh, texture));
              setPreloader('none');
            });
        })
      }

      move(newPlacement, callback = () => { }) {
        this.clearButtons();

        let _sphere = new Sphere(newPlacement, 'active');

        scene.add(_sphere.mesh);

        _sphere.mesh.position.z = _sphere.data.room.position.z;
        _sphere.mesh.position.x = _sphere.data.room.position.x;
        _sphere.mesh.position.y = _sphere.data.room.position.y;

        _sphere.mesh.material.opacity = 0.5;

        let _config = {
          xTarg: _sphere.mesh.position.x,
          yTarg: _sphere.mesh.position.y,
          zTarg: _sphere.mesh.position.z,
          _xTarg: this.mesh.position.x,
          _yTarg: this.mesh.position.y,
          _zTarg: this.mesh.position.z,
        }

        let config = {
          _xTarg: this.mesh.position.x,
          _yTarg: this.mesh.position.y,
          _zTarg: this.mesh.position.z,
          visible: 1,
          _visible: 0
        }

        new TWEEN.Tween(_config)
          .to(
            {
              xTarg: 0,
              yTarg: 0,
              zTarg: 0,
            }, 2000
          )
          .onUpdate(() => {
            _sphere.mesh.position.z = _config.zTarg;
            _sphere.mesh.position.x = _config.xTarg;
            _sphere.mesh.position.y = _config.yTarg;

          })
          .start();

        new TWEEN.Tween(config)
          .to(
            {
              visible: 0,
              _visible: 1
            }, 2000
          )
          .onUpdate(() => {
            _sphere.mesh.material.opacity = config._visible;
            this.mesh.material.opacity = config.visible;

          })
          .onComplete(() => {
            dispose3d(scene, [this.mesh]);

            this.data = _sphere.data;
            this.mesh = _sphere.mesh;

          })
          .start();
      }

    }

    let sphere = new Sphere(currentPlace, 'active');
    scene.add(sphere.mesh);

    document.addEventListener('click', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      let intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length) {
        intersects.forEach(intersect => {
          if (intersect.object.name === 'BUTTON') {
            let trigger = intersect.object,
              direction = trigger.userData.direction;

            this.user._update(direction);
            sphere.move(direction, updateTarget.bind(this));

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




