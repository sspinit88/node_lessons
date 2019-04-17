const express = require('express');
const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
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
