const express = require('express');
const router = new express.Router();
const { body, validationResult } = require('express-validator');
const createError = require('http-errors');

class Container {
  constructor(location, drawer, id) {
    this.location = location;
    this.drawer = drawer;
    this.id = id;
  }
}

const containers = [];

router.get('/new', (req, res, next) => {
  res.render('container_form', { title: "Encodage d'un conteneur" });
});

router.post(
  '/',
  [
    body('location').not().isEmpty().trim().escape(),
    body('drawer').not().isEmpty().trim().escape(),
    body('id').not().isEmpty().trim().escape(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(404));
    }
    const location = req.body.location;
    const drawer = req.body.drawer;
    const id = req.body.id;
    const newItem = new Container(location, drawer, id);
    containers.push(newItem);
    console.log(containers);
    res.redirect('/containers/new');
  }
);

router.get('/locations', (req, res, next) => {
  const allLocations = containers.map((container) => container.location);
  const uniqueLocations = [];
  allLocations.forEach((location) => {
    if (uniqueLocations.indexOf(location) < 0) {
      uniqueLocations.push(location);
    }
  });
  uniqueLocations.sort();
  res.json(uniqueLocations);
});

router.get('/drawers', (req, res, next) => {
  const allDrawers = containers.map((container) => container.drawer);
  const uniqueDrawers = [];
  allDrawers.forEach((drawer) => {
    if (uniqueDrawers.indexOf(drawer) < 0) {
      uniqueDrawers.push(drawer);
    }
  });
  uniqueDrawers.sort();
  res.json(uniqueDrawers);
});

module.exports = router;
