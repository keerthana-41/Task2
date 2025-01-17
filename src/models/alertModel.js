const db = require('../database/dbconnection');

async function createAlert(email, currency, targetPrice) {
  
  const query = 'INSERT INTO alerts (email, currency, target_price) VALUES (?, ?, ?)';

  
  await db.execute(query, [email, currency, targetPrice]);
}

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

