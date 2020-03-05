export default class Button {
  constructor({ x, y, z, direction }) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.direction = direction;
    this.rotate = 0;
    this.WIDTH = 10;
    this.HEIGHT = 10;
    this.DEPTH = 10;
  }

  setRotating(newRotate) {
    this.rotate = newRotate;
  }

  setPosition(key, val) {
    if (key === 'x' | 'z' | 'y') {
      this[key] = val;

      return;
    }

    console.error('The bad key, must be: x, y, z');
  }
  
  getDirection() {
    return this.direction;
  }

  getPositon() {
    return { x: this.x, y: this.y, z: this.z }
  }

  getSize() {
    return {
      width: this.WIDTH,
      height: this.HEIGHT,
      depth: this.DEPTH
    }
  }

}