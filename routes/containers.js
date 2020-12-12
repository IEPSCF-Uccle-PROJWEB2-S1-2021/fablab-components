const express = require('express');
const router = new express.Router();
const { body, query, validationResult } = require('express-validator');
const createError = require('http-errors');
const { Container, containerList } = require('../models/containers');

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
  const locations = containerList.getAllLocations();
  res.json(locations);
});

router.get('/drawers', (req, res, next) => {
  const drawers = containerList.getAllDrawers();
  res.json(drawers);
});

router.get(
  '/search',
  [query('search').optional({ checkFalsy: true }).trim().escape()],
  (req, res, next) => {
    const word = req.query.search;
    let containers = [];
    if (word !== undefined && word !== '') {
      containers = containerList.search(word);
    }
    res.render('container_search', {
      title: 'Liste de conteneurs',
      containers,
    });
  }
);

module.exports = router;
