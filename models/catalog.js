const { v4: uuidv4 } = require('uuid');

class Catalog {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  search(search) {
    const matchingItems = this.items.filter((item) => {
      return item.description.indexOf(search) > -1;
    });
    matchingItems.sort((item1, item2) => {
      if (item1.description < item2.description) {
        return -1;
      } else if (item1.description > item2.description) {
        return 1;
      } else {
        return 0;
      }
    });
    return matchingItems;
  }
}

class Item {
  constructor(description) {
    this.description = description;
    this.uuid = uuidv4();
  }
}

const catalog = new Catalog();

module.exports = { Item, catalog };
