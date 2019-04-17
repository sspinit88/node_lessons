const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // отправляем файл обратно пользователю
  res.sendFile(path.join(__dirname, '../', 'views', 'shop.ejs'));
});

module.exports = router;