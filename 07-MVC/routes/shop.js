const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop-controller');

router.get('/', shopController.getProducts);

module.exports = router;
