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
      this.mapButtons = document.querySelectorAll('.map__point');
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
      this.camera.target = new THREE.Vector3(0, 0, 1);
      this.camera.useQuaternion = true;
      this.user = new User(localStorage);
      this.scene.background = new THREE.Color('0xffffff');
      this.pointerOnButton = false;
      this.eventTimeStart = 0;
      this.diffTime = 0;
      this.saveTarget = { x: 0, y: 0, z: 1 };
      this.actionDelta = 0;

      // this.event
    }

    updateTrigger({ x, y, z }) {
      this.camera.target.set(x, y, z);
    }

    switchButtons(mode) {
      this.mapButtons.forEach(button => mode === false ? button.classList.add('disabled') : button.classList.remove('disabled'));
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

    setTargetPos(x, y, z, diff) {
      this.camera.target.set(x, y, z);

    }

    onPointerStart(ev) {
      if (!this.isMoving) {
        this.isUserInteracting = true;
      }

      this.eventTimeStart = new Date();

      let clientX = ev.clientX,
        clientY = ev.clientY;

      this.onMouseDownMouseX = clientX;
      this.onMouseDownMouseY = clientY;

      this.onMouseDownLon = this.lon;
      this.onMouseDownLat = this.lat;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      let intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length) {
        intersects.forEach(intersect => {
          if (intersect.object.name === 'BUTTON') {
            this.pointerOnButton = true;
          }
        });
      }
    }

    onPointerMove(ev) {

      let clientX = ev.clientX,
        clientY = ev.clientY;

      if (this.isUserInteracting === true) {

        let eventCurrentTime = new Date();
        this.diffTime = (eventCurrentTime - this.eventTimeStart);

        let deltaX = (this.onMouseDownMouseX - clientX),
        deltaY = clientY - this.onMouseDownMouseY;

        if (this.diffTime < 0) { this.diffTime = - (this.diffTime); }

        this.diffTime < 400 ? this.actionDelta = 1 : this.actionDelta = 0;

        this.lon = deltaX * 0.1 + this.onMouseDownLon;
        this.lat = deltaY * 0.1 + this.onMouseDownLat;

        this.lat = Math.max(- 85, Math.min(85, this.lat));
        this.phi = THREE.Math.degToRad(90 - this.lat);
        this.theta = THREE.Math.degToRad(this.lon);

        this.saveTarget = {
          x: (Math.sin(this.phi) * Math.cos(this.theta)),
          y: Math.cos(this.phi),
          z: (Math.sin(this.phi) * Math.sin(this.theta))
        }
      }

      this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;
      this.mouse.z = 0;

      this.htmlMouse.style.left = clientX + 'px';
      this.htmlMouse.style.top = clientY + 'px';
    }

    onPointerUp() {
      this.isUserInteracting = false;
    }

    findInConfig(name, subName) {
      return config.app.find(roomFounding => roomFounding.name === name && roomFounding.subName === subName);
    }

    disableMoving() {
      this.isMoving = false;
      this.switchButtons(true);
    }

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onButton(house) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      let intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length && this.pointerOnButton) {
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
            this.switchButtons(false);
            house.updatePlacement(direction);
            this.setTab(this.mapButtons, house.placement);
            house.move(this.updateTrigger.bind(this), buttonPOS, this.camera.target, this.disableMoving.bind(this));
          }
        });
      }

      this.pointerOnButton = false;
    }

    onTabs(ev, house) {
      if (!ev.target.classList.contains('active')) {
        let direction = this.findInConfig(ev.target.dataset.name, ev.target.dataset.subname);
        if (direction) {
          house.updatePlacement(direction);

          this.setTab(this.mapButtons, house.placement);
          this.user._update(direction);
          house.select();
        }

        else {
          throw new Error(`Can't find direction in config`);
        }
      }
    }

    targetUpdateQuaternion(quaternion) {
      this.camera.target.applyQuaternion(quaternion);
      this.camera.target.normalize();
    }

    updatePosing() {
      if (this.actionDelta) {
  
      }
      else {
        this.setTargetPos(this.saveTarget.x, this.saveTarget.y, this.saveTarget.z);
      }
    }

    render(time) {
      this.updatePosing()
      this.camera.lookAt(this.camera.target);
      requestAnimationFrame((time) => this.render(time));
      this.renderer.render(this.scene, this.camera);
      TWEEN.update();
    }

    init() {
      //~~~~~~~ Logic ~~~~~~~//
      let currentPlace = typeof this.user.placement === 'string' ? JSON.parse(this.user.placement) : this.user.placement,
        house = new House(config.app, currentPlace, this.scene, this.targetUpdateQuaternion.bind(this));

      this.setTab(this.mapButtons, house.placement); house.factoryRoom();

      document.addEventListener('mousedown', (ev) => this.onPointerStart(ev));
      document.addEventListener('mouseenter', (ev) => this.onPointerMove(ev, house));
      document.addEventListener('mousemove', (ev) => this.onPointerMove(ev, house));
      document.addEventListener('mouseup', (ev) => this.onPointerUp(ev));
      document.addEventListener('click', () => this.onButton(house));
      this.mapButtons.forEach(button => button.addEventListener('click', (ev) => this.onTabs(ev, house)));

      document.addEventListener('touchstart', (ev) => this.onPointerStart(ev));
      document.addEventListener('touchmove', (ev) => this.onPointerMove(ev));
      document.addEventListener('touchend', () => this.onPointerUp());

      window.addEventListener('resize', () => this.onWindowResize());

      this.render();
    }
  }

  new App().init();
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




