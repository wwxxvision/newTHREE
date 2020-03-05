import loader from '../utils';
import Button from './button';

export default class Room extends Model {
  constructor(room) {
    this.__validate = (val, type) => {
      if (val) {
        return val;
      }

      throw new Error('Validate Error');
    }
    this.room = this.__validate(rooms);
    this.instancesOfButtons = [];
    this.defaultType = 'hidden';
    this.type = type ? type : this.defaultType;
    this.setVisibility = (type = this.type) => {
      if (type === 'hidden') { return false } 

      return true;
    }
    this.visibility = this.setVisibility();

  }

  setType(type) {
    this.type = type;
  }

  setPosition(newPosiiton) {
    this.room.position = newPosiiton;
  }

  setRotating(newRotate) {
    this.room.rotate = newRotate;
  }

  loadTexture(src) {
    loader(src)
      .then(res => this.room.textureUploaded = res)
      .catch(err => console.error(err));
  }

  FactoryButtons(buttons) {
    const buttons = this.room.buttons;
    buttons.forEach(button => this.instancesOfButtons.push(new Button(button)));
  }

  getRoom() {
    return this.room;
  }
}