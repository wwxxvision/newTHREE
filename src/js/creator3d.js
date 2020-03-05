import * as THREE from 'three';

export default class Creator3d {
  constructor() { }

  createSphere(radius, width, height, _texture) {
    const geometry = new THREE.SphereGeometry(radius, width, height),
      texture = new THREE.MeshBasicMaterial({ map: _texture, side: THREE.DoubleSide, transparent: true });

    return new THREE.Mesh(geometry, texture);
  }

  createBox(width, height, depth) {
    const geometry =  new THREE.BoxGeometry(width, height, depth),
      material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    return new THREE.Mesh(geometry, material);
  }
}