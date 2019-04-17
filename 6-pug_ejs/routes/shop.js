const express = require('express');
// const path = require('path');
const router = express.Router();

const adminRouter = require('./admin');

router.get('/', (req, res) => {
  const title = adminRouter.products;
  res.render('shop',
    {
      pageTitle: 'Shop',
      products: title,
      path: '/',
    }
    )
});

module.exports = router;
