import * as THREE from 'three';

export default class Creator3d {
  constructor() { }

  createSphere(radius, width, height) {
    const geometry = new THREE.SphereGeometry(radius, width, height),
      texture = new THREE.MeshBasicMaterial({ map: null, side: THREE.DoubleSide, transparent: true });

    return new THREE.Mesh(geometry, texture);
  }

  setMaterial(mesh, _texture) {
    mesh.material = new THREE.MeshBasicMaterial({ map: _texture, side: THREE.DoubleSide, transparent: true });
  }

  createBox(width, height, depth) {
    const geometry = new THREE.BoxGeometry(width, height, depth),
      material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
      mesh = new THREE.Mesh(geometry, material);

    mesh.name = 'BUTTON';

    return mesh;
  }
}