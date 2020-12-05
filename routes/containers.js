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
    };
    const location = req.body.location;
    const drawer = req.body.drawer;
    const id = req.body.id;
    const newItem = new Container(location, drawer, id);
    containers.push(newItem);
    console.log(containers);
    res.redirect('/containers/new');
  }
);

module.exports = router;
