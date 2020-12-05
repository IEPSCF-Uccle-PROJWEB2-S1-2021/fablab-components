const express = require('express');
const router = new express.Router();
const { body, validationResult } = require('express-validator');
const createError = require('http-errors');

class Item {
  constructor(description) {
    this.description = description;
  }
}

const catalog = [];

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
    };
    const description = req.body.description;
    const newItem = new Item(description);
    catalog.push(newItem);
    console.log(catalog);
    res.redirect('/items/new');
  }
);

module.exports = router;