const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController");

router.post("/set-alert", alertController.setAlert);

module.exports = router;
