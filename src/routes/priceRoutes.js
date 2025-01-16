const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

// Route to update prices (used in a cron job)
// router.get('/update-prices', priceController.fetchCryptoPrices);
router.get("/update-prices", (req, res) => {
    priceController.fetchCryptoPrices(req, res);
  });

module.exports = router;
