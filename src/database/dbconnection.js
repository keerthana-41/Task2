const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',  
  password: 'root', 
  database: 'crypto_alert_system',
});

module.exports = pool.promise();
