const express = require('express');
const router = new express.Router();
const { body, param, query, validationResult } = require('express-validator');
const createError = require('http-errors');
const { Item, catalog } = require('../models/catalog');
const inventory = require('../models/inventory');
const { containerList } = require('../models/containers');

router.get('/new', (req, res, next) => {
  res.render('item_form', { title: 'Nouveau composant' });
});

router.post(
  '/',
  [body('description').not().isEmpty().trim().escape()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(404));
    }
    const description = req.body.description;
    const newItem = new Item(description);
    catalog.add(newItem);
    console.log(catalog);
    res.redirect('/items/new');
  }
);

router.get(
  '/search',
  [query('search').optional({ checkFalsy: true }).trim().escape()],
  (req, res, next) => {
    const search = req.query.search;
    let items = [];
    if (search !== undefined && search !== '') {
      items = catalog.search(search);
    }
    res.render('item_search', { title: 'Catalogue des composants', items });
  }
);

router.get('/:uuid', [param('uuid').isUUID(4)], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(400));
  }
  try {
    const inventoryLines = inventory.findByItem(req.params.uuid);
    const item = catalog.getByUuid(req.params.uuid);
    const containers = containerList.containers;
    res.render('item_inventory', {
      title: 'Inventaire du composant',
      inventoryLines,
      item,
      containers,
    });
  } catch (e) {
    next(e);
  }
});

router.post(
  '/:itemUuid',
  [
    param('itemUuid').isUUID(4),
    body('containerUuid').isUUID(4),
    body('quantity').isInt({ min: 0 }).toInt(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400));
    }
    try {
      const itemUuid = req.params.itemUuid;
      const containerUuid = req.body.containerUuid;
      const quantity = req.body.quantity;
      const item = catalog.getByUuid(itemUuid);
      const container = containerList.getByUuid(containerUuid);
      inventory.modify(item, container, quantity);
      res.redirect(`/items/${itemUuid}`);
    } catch (e) {
      next(e);
    }

  }
);

module.exports = router;
