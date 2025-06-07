const nodemailer = require('nodemailer');

const sendGmail = (receiver, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    }
  });

  // Set up email data
  const mailOptions = {
    from: process.env.SMTP_EMAIL, // Sender address
    to: receiver, // List of recipients
    subject: 'Hello from Node.js', // Subject line
    text: `Your code is ${code}`, // Plain text body
    // html: '<b>This is a test email sent from Node.js using Nodemailer!</b>' // HTML body (optional)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error occurred: ' + error.message);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

module.exports = { sendGmail };