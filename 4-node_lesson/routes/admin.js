const path = require('path');
const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');

router.get('/add-product', (req, res, next) => {
  // отправляем файл обратно пользователю
  res.sendFile(path.join(rootDir, 'views', 'add-product.ejs'))
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/')
});

module.exports = router;