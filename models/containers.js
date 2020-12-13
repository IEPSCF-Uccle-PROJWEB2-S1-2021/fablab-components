const { v4: uuidv4 } = require('uuid');

class ContainerList {
  constructor() {
    this.containers = [];
  }

  add(container) {
    this.containers.push(container);
  }

  getAllLocations() {
    const allLocations = this.containers.map((container) => container.location);
    const uniqueLocations = [];
    allLocations.forEach((location) => {
      if (!uniqueLocations.includes(location)) {
        uniqueLocations.push(location);
      }
    });
    uniqueLocations.sort();
    return uniqueLocations;
  }

  getAllDrawers() {
    const allDrawers = this.containers.map((container) => container.drawer);
    const uniqueDrawers = [];
    allDrawers.forEach((drawer) => {
      if (!uniqueDrawers.includes(drawer)) {
        uniqueDrawers.push(drawer);
      }
    });
    uniqueDrawers.sort();
    return uniqueDrawers;
  }

  search(word) {
    const matchingContainers = this.containers.filter((container) => {
      const re = new RegExp(word, 'i');
      return (
        re.test(container.location) ||
        re.test(container.drawer) ||
        re.test(container.label)
      );
    });
    matchingContainers.sort((container1, container2) => {
      return container1.compareTo(container2);
    });
    return matchingContainers;
  }

  getByUuid(uuid) {
    const matchingContainers = this.containers.filter((container) => {
      return container.uuid === uuid;
    });
    if (matchingContainers.length === 1) {
      return matchingContainers[0];
    } else {
      throw new Error('no matching container');
    }
  }
}

class Container {
  constructor(location, drawer, label) {
    this.location = location;
    this.drawer = drawer;
    this.label = label;
    this.uuid = uuidv4();
  }
  get description() {
    return [this.location, this.drawer, this.label].join(', ');
  }
  compareTo(otherContainer) {
    if (this.description < otherContainer.description) {
      return -1;
    } else if (this.description > otherContainer.description) {
      return 1;
    } else {
      return 0;
    }
  }
}

const containerList = new ContainerList();

containerList.add(new Container('Réserve', 'A', '11'));
containerList.add(new Container('Réserve', 'A', '12'));
containerList.add(new Container('Réserve', 'A', '21'));
containerList.add(new Container('Réserve', 'A', '22'));
containerList.add(new Container('Réserve', 'B', '11'));
containerList.add(new Container('Réserve', 'B', '12'));
containerList.add(new Container('Réserve', 'B', '21'));
containerList.add(new Container('Réserve', 'B', '22'));
containerList.add(new Container('Lab', 'L1', '1'));
containerList.add(new Container('Lab', 'L1', '2'));
containerList.add(new Container('Lab', 'L1', '3'));
containerList.add(new Container('Lab', 'L1', '5'));
containerList.add(new Container('Lab', 'L1', '8'));

module.exports = { Container, containerList };
