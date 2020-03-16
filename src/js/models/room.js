import * as THREE from 'three';
import Button from './button';

export default class Room {
  constructor(room, scene, updateQntrn) {
    this.room = this.validate(room);
    this.instancesOfButton = [];
    this.scene = scene;
    this.WIDTH = 60;
    this.HEIGHT = 40;
    this.RADIUS =  270;
    this.mesh = {};
    this.PRELOADER = document.querySelector('.preloader');
    this.MAP =  document.querySelector('.map');
    this.updateQntrn = updateQntrn;
  }

  validate(val) {
    if (val) {
      return val;
    }

    throw new Error('Validate Error');
  }

  setPreloader(type) {
    this.PRELOADER.style.display = type ? 'flex' : 'none';
  }

  __delete3d(arg) {
    arg.forEach(mesh => {
      this.scene.remove(mesh);
      mesh.material.dispose();
      mesh.geometry.dispose();
      mesh = null;
    });
  }

  rotate() {
     this.mesh.rotateY(this.room.rotate);
  }

  __createSphere(radius, width, height) {
    const geometry = new THREE.SphereGeometry(radius, width, height),
      texture = new THREE.MeshBasicMaterial({ map: null, side: THREE.DoubleSide, transparent: true });

    return new THREE.Mesh(geometry, texture);
  }

  __setMaterial(mesh, _texture) {
    mesh.material = new THREE.MeshBasicMaterial({ map: _texture, side: THREE.DoubleSide, transparent: true });
  }


  __uploadTexture(src, _mesh) {
    return new Promise(resolve => {

      let self = this;
      new THREE.TextureLoader().load(src,
        function (texture) {
          resolve(self.__setMaterial(_mesh, texture));
        });
    })
  }

  __createBox(width, height, depth) {
    const geometry = new THREE.BoxGeometry(width, height, depth),
      material = new THREE.MeshBasicMaterial({ color: 0xffffff }),
      mesh = new THREE.Mesh(geometry, material);

    mesh.name = 'BUTTON';

    return mesh;
  }

  factoryButtons() {
    const _buttons = this.room.buttons;

    _buttons.forEach(button => this.instancesOfButton.push(new Button(button)));

    if (this.instancesOfButton.length) {
      this.instancesOfButton.forEach(button => {
        let mesh = this.__createBox(button.WIDTH, button.HEIGHT, button.DEPTH);

        mesh.userData = button;
        mesh.position.set(button.x, button.y, button.z);

        button.mesh = mesh;
        this.scene.add(mesh)
      });
    }
    else { console.warn(`Can not create buttons , because (instancesOfButton) is empty`); }
  }

  removedButtons() {
    this.instancesOfButton.forEach(button => {
      this.__delete3d([button.mesh]);
    });

    this.instancesOfButton = [];

  }

  removedRoom() {
    this.__delete3d([this.mesh]);
  }

  render(isFirstRender) {
    return new Promise((resolve) => {
      this.setPreloader(true);

      this.mesh = this.__createSphere(this.RADIUS, this.WIDTH, this.HEIGHT);

      this.__uploadTexture(this.room.src, this.mesh).then(() => {

        if (isFirstRender) {
          this.factoryButtons();
          
          if (!this.MAP.classList.contains('.loaded')) {
            this.MAP.classList.add('loaded');
          }
        }

        this.rotate();
        if (this.updateQntrn) {
          this.updateQntrn.call(this, this.mesh.quaternion);
        }
        resolve(this.scene.add(this.mesh));
        this.setPreloader(false);
      });
    })
  }

}
