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
      if (uniqueLocations.indexOf(location) < 0) {
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
      if (uniqueDrawers.indexOf(drawer) < 0) {
        uniqueDrawers.push(drawer);
      }
    });
    uniqueDrawers.sort();
    return uniqueDrawers;
  }

  search(word) {
    const matchingContainers = this.containers.filter((container) => {
      return (
        container.location.indexOf(word) > -1 ||
        container.drawer.indexOf(word) > -1 ||
        container.id.indexOf(word) > -1
      );
    });
    return matchingContainers;
  }
}

class Container {
  constructor(location, drawer, id) {
    this.location = location;
    this.drawer = drawer;
    this.id = id;
  }
}

const containerList = new ContainerList();

module.exports = { Container, containerList };
