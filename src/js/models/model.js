import Observable from "../observable";

export default class Model extends Observable {
  constructor(name, props) {
    super();
    this.name = name;
    this.props = props;
    this.type = 'Interface';
  }
  
  action(event, callback) {
    this.emit(event, callback);
  }
}