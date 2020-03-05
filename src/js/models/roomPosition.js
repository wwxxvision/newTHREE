
export default class RoomPosition extends Model {
  constructor(name, props) {
    this.name = name;
    this.props = props;
    this.type = 'Room_Position';
    this.state = {
      name: this.props.subName,
      buttons: this.props.buttons
    }
  }
  
  getButtons() {
    this.action('getButtons', this.state.buttons);
  }
}