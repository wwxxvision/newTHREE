import * as THREE from 'three'

export default class Room {
  constructor(type, texture) {
    Object.defineProperty(this, '__radius', { enumerable: false, value: 500 }); //private field 
    Object.defineProperty(this, '__height', { enumerable: false, value: 60 }); //private field 
    Object.defineProperty(this, '__width', { enumerable: false, value: 40 }); //private field 
    this.type = type; //Can be active or hidden
    this.texture = texture;
    this.geometry = new THREE.SphereGeometry(this.__radius, this.__height, this.__width);
    this.material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  setMaterial(texture) {
    this.mesh.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
  }
}