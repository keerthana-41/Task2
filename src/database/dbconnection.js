const mysql = require('mysql2');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',  
  password: 'root', 
  database: 'crypto_alert_system',
});

module.exports = pool.promise();
