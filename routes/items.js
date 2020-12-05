const express = require('express');
const router = new express.Router();

class Item {
  constructor(description) {
    this.description = description;
  }
}

const catalog = [];

router.get('/new', (req, res, next) => {
  res.render('item_form', { title: 'Encodage d\'un article' });
});

router.post('/', (req, res, next) => {
  const description = req.body.description;
  const newItem = new Item(description);
  catalog.push(newItem);
  console.log(catalog);
  res.redirect('/items/new');
});

module.exports = router;
