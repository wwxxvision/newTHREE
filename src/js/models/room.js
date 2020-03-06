import Button from './button';

export default class Room  {
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

  factoryButtons() {
    const _buttons = this.room.buttons;
    _buttons.forEach(button => this.instancesOfButton.push(new Button(button)));
  }
}