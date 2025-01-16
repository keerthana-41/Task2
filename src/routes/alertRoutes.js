const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController");

// Route to set a new alert
router.post("/set-alert", alertController.setAlert);

module.exports = router;
