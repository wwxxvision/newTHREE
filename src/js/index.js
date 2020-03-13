//~~~~~~~ IMPORTS ~~~~~~~//
import '../styles/index.scss';
import * as THREE from 'three';
import config from './config';
import User from './user';
import House from './models/house';
import TWEEN from 'tween.js';

//~~~~~~~ APP ~~~~~~~//
try {
  class App {
    constructor() {
      this.isUserInteracting = false;
      this.onMouseDownMouseX = 0;
      this.onMouseDownMouseY = 0;
      this.lon = 0;
      this.onMouseDownLon = 0;
      this.lat = 0;
      this.onMouseDownLat = 0;
      this.phi = 0;
      this.theta = 0;
      this.isMoving = false;
      this.menuButtons = document.querySelectorAll('.map__point');
      this.htmlMouse = document.querySelector('.circle');

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(config.camera.fov, window.innerWidth / window.innerHeight, config.camera.near, config.camera.far);
      this.renderer = new THREE.WebGLRenderer();
      this.domElement = config.render.domElement;
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.domElement.appendChild(this.renderer.domElement);
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector3();
      this.camera.target = new THREE.Vector3(0, 0, 0);
      this.user = new User(localStorage);
    }

    updateTrigger({ x, y, z }) {
      this.setTargetPos(x, y, z);
    }

    switchButtons(mode) {
      this.menuButtons.forEach(button => {
        if (mode === 'off') {
          button.classList.add('disabled');
        }

        else {
          button.classList.remove('disabled');
        }
      })
    }

    setTab(tabs, house) {
      tabs.forEach((tab) => {
        let tabName = tab.dataset.name,
          tabSubName = tab.dataset.subname;

        if (tabName === house.name && tabSubName === house.subName) {
          tab.classList.add('active');
        }

        else {
          tab.classList.remove('active');
        }
      });
    }

    onPointerStart(ev) {
      if (!this.isMoving) {
        this.isUserInteracting = true;
      }

      let clientX = ev.clientX,
        clientY = ev.clientY;

      this.onMouseDownMouseX = clientX;
      this.onMouseDownMouseY = clientY;

      this.onMouseDownLon = this.lon;
      this.onMouseDownLat = this.lat;
    }

    setTargetPos(x, y, z) {
      let animateCamera = {
        _x: this.camera.target.x,
        _y: this.camera.target.y,
        _z: this.camera.target.z
      }

      new TWEEN.Tween(animateCamera)
        .to(
          {
            _x: x,
            _y: y,
            _z: z
          }, 500
        )
        .onUpdate(() => {
          this.camera.target.set(animateCamera._x, animateCamera._y, animateCamera._z);
        })
        .start();
    }

    onPointerMove(ev) {
      let clientX = ev.clientX,
        clientY = ev.clientY;

      if (this.isUserInteracting === true) {
        this.lon = (this.onMouseDownMouseX - clientX) * 0.1 + this.onMouseDownLon;
        this.lat = (clientY - this.onMouseDownMouseY) * 0.1 + this.onMouseDownLat;

        this.lat = Math.max(- 85, Math.min(85, this.lat));
        this.phi = THREE.Math.degToRad(90 - this.lat);
        this.theta = THREE.Math.degToRad(this.lon);

        this.setTargetPos((Math.sin(this.phi) * Math.cos(this.theta)), Math.cos(this.phi), (Math.sin(this.phi) * Math.sin(this.theta)));
      }

      this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;
      this.mouse.z = 0;


      this.htmlMouse.style.left = clientX + 'px';
      this.htmlMouse.style.top = clientY + 'px';
    }

    findInConfig(name, subName) {
      return config.app.find(roomFounding => roomFounding.name === name && roomFounding.subName === subName);
    }

    onPointerUp() {
      this.isUserInteracting = false;
    }

    disableMoving() {
      this.isMoving = false;
      this.switchButtons('on');
    }

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    onButton(ev, house) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      let intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length) {
        intersects.forEach(intersect => {
          if (intersect.object.name === 'BUTTON') {
            let direction = intersect.object.userData.direction,
              buttonPOS = {
                x: intersect.object.userData.x,
                y: intersect.object.userData.y,
                z: intersect.object.userData.z
              }
            this.user._update(direction);

            this.isMoving = true;
            this.switchButtons('off');
            house.updatePlacement(direction);
            this.setTab(this.menuButtons, house.placement);
            house.move(this.updateTrigger.bind(this), buttonPOS, this.camera.target, this.disableMoving.bind(this));
          }
        });
      }

    }

    onTabs(ev, house) {
      if (!ev.target.classList.contains('active')) {
        let direction = this.findInConfig(ev.target.dataset.name, ev.target.dataset.subname);
        if (direction) {
          house.updatePlacement(direction);

          this.setTab(this.menuButtons, house.placement);
          this.user._update(direction);
          house.select();
        }

        else {
          throw new Error(`Can't find direction in config`);
        }
      }
    }

    init() {

      //~~~~~~~ Logic ~~~~~~~//
      let currentPlace = typeof this.user.placement === 'string' ? JSON.parse(this.user.placement) : this.user.placement,
        house = new House(config.app, currentPlace, this.scene);

      this.setTab(this.menuButtons, house.placement); house.factoryRoom();

      document.addEventListener('mousedown', (ev) => this.onPointerStart(ev));
      document.addEventListener('mousemove', (ev) => this.onPointerMove(ev, house));
      document.addEventListener('mouseup', (ev) => this.onPointerUp(ev));
      document.addEventListener('click', (ev) => this.onButton(ev, house));
      this.menuButtons.forEach(button => button.addEventListener('click', (ev) => this.onTabs(ev, house)));

      document.addEventListener('touchstart', (ev) => this.onPointerStart(ev));
      document.addEventListener('touchmove', (ev) => this.onPointerMove(ev));
      document.addEventListener('touchend', (ev) => this.onPointerUp(ev));

      window.addEventListener('resize', () => this.onWindowResize());
    }

    render() {
      this.camera.lookAt(this.camera.target);
      requestAnimationFrame(() => this.render());
      this.renderer.render(this.scene, this.camera);
      TWEEN.update();
    }
  }

  const app = new App();

  app.render(); app.init();
}

catch (err) {
  console.error(`App has some issue and can not run ${err}`);

  let erroData = `
    <div style="text-align: center; color: red;">
      'App has some issue and can not run.Try later again , please.'
      ${err}
    </div>
  `;

  document.body.innerHTML = erroData;
}




