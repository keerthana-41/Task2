const db = require('../database/dbconnection');

// Add a new alert for a user
async function createAlert(email, currency, targetPrice) {
  // console.log("createalert");
  
  const query = 'INSERT INTO alerts (email, currency, target_price) VALUES (?, ?, ?)';
  // console.log("queryyy",query);
  
  await db.execute(query, [email, currency, targetPrice]);
}

// Get all alerts from the database
async function getAlerts() {
  const query = 'SELECT * FROM alerts';
  const [alerts] = await db.execute(query);
  console.log("alerts array inside getalerts method",alerts);
  
  return alerts;
}

module.exports = {
  createAlert,
  getAlerts
};

