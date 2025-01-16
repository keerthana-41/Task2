const alertModel = require('../models/alertModel');
const nodemailer = require('nodemailer');

// Function to create a new alert
async function setAlert(req, res) {
  const { email, currency, targetPrice } = req.body;

  try {
    // Create alert in the database
    await alertModel.createAlert(email, currency, targetPrice);
    res.status(200).send('Alert set successfully');
  } catch (error) {
    res.status(500).send('Error setting alert');
  }
}

// Function to send alert emails
async function sendAlert(email, currency, targetPrice, currentPrice) {
  console.log("inside sendalerttt");
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vayalapallik@gmail.com',  // Replace with your email
      pass: 'Keerthana@10'    // Replace with your email password or app password
    }
  });
  console.log("transporter",transporter);
  let mailOptions = {
    from: 'vayalapallik@gmail.com',
    to: email,
    subject: `${currency} Price Alert`,
    text: `${currency} has reached your target price of $${targetPrice}. Current price: $${currentPrice}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Alert sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Function to check alerts and send notifications
async function checkAlerts(prices) {
  try {
    console.log("areyyyy");
    
    // Fetch all alerts from the database
    const alerts = await alertModel.getAlerts();
    console.log("alerts model",alerts);
  
    alerts.forEach(async (alert) => {
      console.log("alert inside checkalert",alerts);
      console.log("alert",alert);
      const { email, currency, targetPrice } = alert;
      const currentPrice = prices[currency]?.usd;
      console.log("currentprice and target price",currentPrice,targetPrice);
    
      if (currentPrice && currentPrice >= targetPrice) {
        // Send email alert if target is reached
        console.log("sending alert email");
        await sendAlert(email, currency, targetPrice, currentPrice);
        // Optionally, you could update the alert status in the DB to 'notified'
      }
    });
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
}

module.exports = {
  setAlert,
  sendAlert,
  checkAlerts,  // Add checkAlerts to the exports
};
