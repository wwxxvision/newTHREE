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
    return  this.rooms.find(room => room.name === selectingRoom.name && room.subName === selectingRoom.subName);
  }

}