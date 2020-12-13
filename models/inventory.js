class Inventory {
  constructor() {
    this.inventoryLines = [];
  }
  modify(item, container, quantity) {
    let line = undefined;
    try {
      line = this.getByItemAndContainer(item, container);
      if (quantity > 0) {
        line.quantity = quantity;
      } else {
        const lineIndex = this.inventoryLines.indexOf(line);
        this.inventoryLines.splice(lineIndex, 1);
      }
    } catch (e) {
      line = new InventoryLine(item, container, quantity);
      this.inventoryLines.push(line);
    }
  }
  getByItemAndContainer(item, container) {
    const matchingLines = this.inventoryLines.filter((line) => {
      return (
        line.item.uuid === item.uuid && line.container.uuid === container.uuid
      );
    });
    if (matchingLines.length !== 1) {
      throw new Error('not matching a single line');
    } else {
      return matchingLines[0];
    }
  }
  findByItem(itemUuid) {
    const matchingLines = this.inventoryLines.filter((line) => {
      return line.item.uuid === itemUuid;
    });
    matchingLines.sort((line1, line2) => {
      return line1.container.compareTo(line2.container);
    });
    return matchingLines;
  }
  findByContainer(containerUuid) {
    const matchingLines = this.inventoryLines.filter((line) => {
      return line.container.uuid === containerUuid;
    });
    matchingLines.sort((line1, line2) => {
      return line1.item.compareTo(line2.item);
    });
    return matchingLines;
  }
}

class InventoryLine {
  constructor(item, container, quantity) {
    this.item = item;
    this.container = container;
    this.quantity = quantity;
  }
}

const inventory = new Inventory();

module.exports = inventory;
