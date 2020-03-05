
export default class Room extends Model {
  constructor(name, props) {
    this.name = name;
    this.props = props;
    this.type = 'Room';
    this.defaultType = 'hidden';
    this.state = {
      type: this.props.type,
      name: this.props.name,
      order: this.props.order,
      position: this.props.position
    }
  }
  
  setType(type) {
    this.state.type = type;
    this.action('changeType', this.state.type );
  }

  getRoom() {
    this.action('getRoom', this.state );
  }

}