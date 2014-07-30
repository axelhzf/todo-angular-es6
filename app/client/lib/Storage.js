var _ = require("underscore");

class Storage {
  constructor(Model) {
    this.Model = Model;
    this.id = `${this.Model.name}-Storage`;
  }

  get() {
    var items = JSON.parse(localStorage.getItem(this.id) || '[]');
    return _.map(items, (item) => new this.Model(item));
  }

  put(obj) {
    localStorage.setItem(this.id, JSON.stringify(obj));
  }

}

module.exports = Storage;