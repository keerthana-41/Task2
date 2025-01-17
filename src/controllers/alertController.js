const alertModel = require('../models/alertModel');
const nodemailer = require('nodemailer');


async function setAlert(req, res) {
  const { email, currency, targetPrice } = req.body;

  try {
    await alertModel.createAlert(email, currency, targetPrice);
    res.status(200).send('Alert set successfully');
  } catch (error) {
    res.status(500).send('Error setting alert');
  }
}

async function sendAlert(email, currency, targetPrice, currentPrice) {
  console.log("inside sendalerttt");
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pythoncourse.143@gmail.com',  
      pass: 'iyft esdo ffee sngk'  
    },
    secure: true,  
    port: 465, 
  });
  console.log("transporter", transporter);
  
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

async function checkAlerts(prices) {
  try {

    const alerts = await alertModel.getAlerts();
    console.log("alerts model", alerts);

    alerts.forEach(async (alert) => {
      console.log("alert inside checkalert", alerts);
      console.log("alert", alert);
      const { email, currency, target_price } = alert;
      const currentPrice = prices[currency]?.usd; 
      console.log("currentprice and target price", currentPrice, target_price);

      if (currentPrice && currentPrice >= target_price) {
        console.log("sending alert email");
        await sendAlert(email, currency, target_price, currentPrice);
      }
    });
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
}

module.exports = {
  setAlert,
  sendAlert,
  checkAlerts,  
};
