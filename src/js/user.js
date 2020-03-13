export default class User {
  constructor(localStorage) {
    this.localStorage = localStorage;
    this.reset = { "name": "bedroom", "subName": "a" };
    this.getPlacement = () => {
      this.localStorage.getItem('user-placement');
        return this.localStorage.getItem('user-placement') 
        ? this.localStorage.getItem('user-placement')
        : this.reset;
    }
    this.placement = this.getPlacement();
    this._update = (data) => {
      this.localStorage.setItem('user-placement', JSON.stringify(data));
    }
  }

  reset() {
    this.localStorage.setItem('user-placement', this.reset);
  }
}