const express = require("express");
const priceRoutes = require("./src/routes/priceRoutes");
const alertRoutes = require("./src/routes/alertRoutes");
const priceController = require("./src/controllers/priceController");
const alertController = require("./src/controllers/alertController");

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Crypto Price Monitoring System is Running...");
});

app.use("/api", priceRoutes);
app.use("/api", alertRoutes);

const checkAlerts = async () => {
  try {
    console.log("inside checkAlerts");

    const prices = await priceController.fetchCryptoPrices();
    console.log("prices inside checkAlerts", prices);

    if (prices && Object.keys(prices).length > 0) {
      await alertController.checkAlerts(prices);
    } else {
      console.log("No prices found to check alerts.");
    }
  } catch (error) {
    console.error("Error checking alerts:", error);
  }
};


setInterval(checkAlerts, 30000);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
