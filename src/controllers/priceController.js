const axios = require("axios");

let cachedPrices = {}; 

const fetchCryptoPrices = async (req, res) => {
  try {
    console.log("Fetching new data from API...");
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    );

    cachedPrices = response.data;
    console.log("Updated Prices:", cachedPrices);

    if (res) {
      res.json({ success: true, prices: cachedPrices });
    }
    return cachedPrices; 
  } catch (error) {
    console.error("Error fetching cryptocurrency prices:", error.message);
    if (res) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch prices",
      });
    }
    return {}; 
  }
};


const getCryptoPrices = (req, res) => {
  if (Object.keys(cachedPrices).length === 0) {
    return res.status(404).json({ success: false, message: "No data available yet" });
  }
  res.json({ success: true, prices: cachedPrices });
};

module.exports = { fetchCryptoPrices, getCryptoPrices };
