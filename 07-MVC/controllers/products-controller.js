const ProductModel = require('../models/product-model');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true
  });
};

exports.postAddProduct = (req, res) => {
  let addedProducts = req.body.title;
  if (addedProducts !== '') {
    const product = new ProductModel(addedProducts);
    product.save();
  }
  res.redirect('/');
};
