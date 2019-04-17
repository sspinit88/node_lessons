const express = require('express');
const router = express.Router();
const path = require('path');

const rootDir = require('../util/path');

const products = [];

router.get('/add-product', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/product', (req, res) => {
  let addedProducts = req.body.title;
  if (addedProducts !== '') {
    products.push(addedProducts);
  }
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
