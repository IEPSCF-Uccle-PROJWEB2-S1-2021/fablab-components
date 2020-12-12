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
      return item1.compareTo(item2);
    });
    return matchingItems;
  }
}

class Item {
  constructor(description) {
    this.description = description;
    this.uuid = uuidv4();
  }
  compareTo(otherItem) {
    if (this.description < otherItem.description) {
      return -1;
    } else if (this.description > otherItem.description) {
      return 1;
    } else {
      return 0;
    }
  }
}

const catalog = new Catalog();

catalog.add(new Item('Résistance 50 Ohm'));
catalog.add(new Item('Résistance 100 Ohm'));
catalog.add(new Item('Résistance 220 Ohm'));
catalog.add(new Item('Résistance 470 Ohm'));
catalog.add(new Item('Capacité 100 nF'));
catalog.add(new Item('Capacité 1 uF'));
catalog.add(new Item('Capacité 10 uF'));
catalog.add(new Item('Capacité 100 uF'));

module.exports = { Item, catalog };
