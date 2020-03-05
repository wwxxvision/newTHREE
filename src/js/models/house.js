export default class House {
  constructor(rooms) {
    this.rooms = this.validate(rooms);
  }

  validate(val) {
    if (Array.isArray(val) && val.length > 0) {
      return val;
    }

    throw new Error('Validate Error');
  }

  selectRoom(selectingRoom) {
    let detected = this.rooms.find(room => room.name === selectingRoom.name);

    if (detected.length > 0) {
      return detected;
    }

    console.warn('Not found room');
    return [];
  }

}