const express = require('express');
const router = new express.Router();
const { body, validationResult } = require('express-validator');
const createError = require('http-errors');
const {Container, containerList} = require('../models/containers');


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
    containerList.add(newItem);
    console.log(containerList);
    res.redirect('/containers/new');
  }
);

router.get('/locations', (req, res, next) => {
  const allLocations = containerList.getAllLocations();
  res.json(allLocations);
});

router.get('/drawers', (req, res, next) => {
  const uniqueDrawers = containerList.getAllDrawers();
  res.json(uniqueDrawers);
});

module.exports = router;
