const express = require('express');
const router = new express.Router();
const { body, param, query, validationResult } = require('express-validator');
const createError = require('http-errors');
const { Container, containerList } = require('../models/containers');
const { catalog } = require('../models/catalog');
const inventory = require('../models/inventory');

router.get('/new', (req, res, next) => {
  res.render('container_form', { title: 'Nouveau conteneur' });
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
      title: 'Liste des conteneurs',
      containers,
    });
  }
);

router.get('/:uuid', [param('uuid').isUUID(4)], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(400));
  }
  try {
    const inventoryLines = inventory.findByContainer(req.params.uuid);
    const container = containerList.getByUuid(req.params.uuid);
    const items = catalog.items;
    res.render('container_inventory', {
      title: 'Inventaire du conteneur',
      inventoryLines,
      container,
      items,
    });
  } catch (e) {
    next(e);
  }
});

router.post(
  '/:containerUuid',
  [
    param('containerUuid').isUUID(4),
    body('itemUuid').isUUID(4),
    body('quantity').isInt({ min: 0 }).toInt(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400));
    }
    try {
      const containerUuid = req.params.containerUuid;
      const itemUuid = req.body.itemUuid;
      const quantity = req.body.quantity;
      const item = catalog.getByUuid(itemUuid);
      const container = containerList.getByUuid(containerUuid);
      inventory.modify(item, container, quantity);
      res.redirect(`/containers/${containerUuid}`);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
