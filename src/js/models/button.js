export default class Button {
  constructor({ x, y, z, direction }) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.direction = direction;
    this.WIDTH = 2;
    this.HEIGHT = 2;
    this.DEPTH = 2;
    this.mesh = {};
  }

}