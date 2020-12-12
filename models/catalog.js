class Catalog {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }
}

class Item {
  constructor(description) {
    this.description = description;
  }
}

const catalog = new Catalog();

module.exports = { Item, catalog };
