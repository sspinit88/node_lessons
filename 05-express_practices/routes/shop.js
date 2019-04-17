const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');
const adminRouter = require('./admin');

router.get('/', (req, res) => {
  const text = adminRouter.products;
  res.sendFile(
    path.join(rootDir , 'views', 'shop.ejs'));
});

module.exports = router;
