const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

router.get("/update-prices", (req, res) => {
    priceController.fetchCryptoPrices(req, res);
  });

module.exports = router;
