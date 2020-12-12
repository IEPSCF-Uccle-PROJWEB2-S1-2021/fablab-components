const express = require('express');
const router = new express.Router();
const { body, query, validationResult } = require('express-validator');
const createError = require('http-errors');
const { Item, catalog } = require('../models/catalog');

router.get('/new', (req, res, next) => {
  res.render('item_form', { title: "Encodage d'un article" });
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
    res.render('item_search', { title: "Catalogue d'articles", items });
  }
);

module.exports = router;
