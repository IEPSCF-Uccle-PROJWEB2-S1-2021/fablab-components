const locationOptions = document.getElementById('locationOptions');

fetch('/containers/locations')
  .then((response) => response.json())
  .then((locations) => {
    locations.forEach(location => {
      const option = document.createElement('option');
      option.value = location;
      locationOptions.appendChild(option);
    });
  });

const drawerOptions = document.getElementById('drawerOptions');

fetch('/containers/drawers')
  .then((response) => response.json())
  .then((drawers) => {
    drawers.forEach(drawer => {
      const option = document.createElement('option');
      option.value = drawer;
      drawerOptions.appendChild(option);
    });
  });
