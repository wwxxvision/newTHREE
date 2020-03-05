import loader from '../utils';
import Button from './button';

export default class Room extends Model {
  constructor(room, type) {
    this.room = this.validate(room);
    this.instancesOfButton = [];
    this.defaultType = 'hidden';
    this.type = type ? type : this.defaultType;
    this.WIDTH = 60;
    this.HEIGHT = 40;
    this.RADIUS = 500;
    this.opacity = this.type !== 'hidden' ? 1 : 0;
    this.rotate = 0;
  }

  validate(val) {
    if (val) {
      return val;
    }

    throw new Error('Validate Error');
  }

  setType(type) {
    this.type = type;
  }

  setPosition(newPosiiton) {
    this.room.position = newPosiiton;
  }

  setRotating(newRotate) {
    this.rotate = newRotate;
  }

  setOpacity(newOpacity) {
    this.opacity = newOpacity;
  }

  loadTexture(src) {
    loader(src)
      .then(res => this.room.textureUploaded = res)
      .catch(err => console.error(err));
  }

  FactoryButtons(buttons) {
    const buttons = this.room.buttons;
    buttons.forEach(button => this.instancesOfButton.push(new Button(button)));
  }

  getRoom() {
    return this.room;
  }

  getSize() {
    return {
      width: this.WIDTH,
      height: this.HEIGHT,
      radius: this.RADIUS
    }
  }

  getTexture() {
    return this.room.textureUploaded
  }

}