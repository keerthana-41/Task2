const db = require('../database/dbconnection');

// Save cryptocurrency price in the database
async function savePrice(currency, price) {
  const query = 'INSERT INTO prices (currency, price) VALUES (?, ?)';
  await db.execute(query, [currency, price]);
}

// Get the latest price for a currency
async function getPrice(currency) {
  const query = 'SELECT price FROM prices WHERE currency = ? ORDER BY last_updated DESC LIMIT 1';
  const [rows] = await db.execute(query, [currency]);
  return rows[0];
}

module.exports = {
  savePrice,
  getPrice
};
