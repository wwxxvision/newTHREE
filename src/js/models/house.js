import Model from "./model";
import config from '../config';


export default class House extends Model {
  constructor(name, props) {
    this.name = name;
    this.props = props;
    this.type = 'House';
    this.rooms = config.app;
    this.defaultRoom = config.app[0];
    this.currentRoom = this.defaultRoom;
  }
  
  selectRoom(roomSelecting) {
    let detected = this.rooms.find(room => roomSelecting);
    this.currentRoom = this.detected;
    this.action('selectedRoom', this.currentRoom );
  }

  initRoom() {
    this.action('initRoom', this.currentRoom );
  }
}