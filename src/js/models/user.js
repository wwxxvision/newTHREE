export default class User {
  constructor(localStorage) {
    this.localStorage = localStorage;
    this.reset = { id: 0, "name": "a" };
    this.getPlacement = () => {
      this.localStorage.getItem('user-placement');
        return this.localStorage.getItem('user-placement') 
        ? this.localStorage.getItem('user-placement')
        : this.reset;
    }
    this.placement = this.getPlacement();
  }

  update(data) {
    this.localStorage.setItem('user-placement', data);
  }

  reset() {
    this.localStorage.setItem('user-placement', this.reset);
  }
}