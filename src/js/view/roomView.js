import * as THREE from 'three';

export default class RoomView {
  constructor(model) {
    this.model = model
  }

  render() {
    const { width, height, radius } = this.model.getSize();
    const geometry = new THREE.SphereBufferGeometry(radius, width, height);
    const material = new THREE.MeshBasicMaterial( { map: this.model.getTexture() } ); 
    const mesh = new THREE.Mesh(geometry, material);
    
    geometry.scale( - 1, 1, 1 );

    return mesh;
  }
}