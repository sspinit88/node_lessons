const productsData = require('../models/product-model');

exports.getProducts = (req, res) => {
  productsData.getAll(products => {
    res.render('shop',
      {
        pageTitle: 'Shop',
        products: products,
        path: '/',
        hasProducts: products.length > 0,
      })
  });
};