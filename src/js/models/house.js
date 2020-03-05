export default class House  {
  constructor(rooms) {
    this.__validate = (val) => {
      if (Array.isArray(val) && val.length > 0) {
        return val;
      }

      throw new Error('Validate Error');
    }
    this.rooms = this.__validate(rooms); 
  }
  
  selectRoom(selectingRoom) {
    let detected = this.rooms.find(room => room.name === selectingRoom.name);
    
    if (detected.length) {
      return detected;
    }

    console.warn('Not found room');
    return [];
  }


}