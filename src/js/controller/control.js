export default class Control {
  constructor(scene) {
    this.scene = scene.scene;
  }

  addMesh(mesh) {
    this.scene.add(mesh);
  }

  deleteMesh(mesh) {
    this.scene.remove(mesh);
    mesh.material.dispose();
    mesh.geometry.dispose();
    mesh = undefined;
  }

  setPositionMesh(mesh, coordinates) {
    let { x, y, z } = coordinates;
    mesh.position.set(x, y, z);
  }

}