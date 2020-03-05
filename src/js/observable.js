export default class Observable {
  constructor() {
    this.observs = new Map();
  }

  addObservable(label, callback) {
    this.observs.has(label) || this.observs.set(label, []);
    this.observs.get(label).push(callback);
  }

  emit(label, e) {
    const observs = this.observs.get(label);

    if (observs && observs.length) {
      observs.forEach((callback) => {
        callback(e)
      });
    }
  }
}