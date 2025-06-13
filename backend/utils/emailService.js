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
    from: process.env.SMTP_EMAIL, 
    to: receiver, 
    subject: 'Hello from Node.js', 
    text: `Your code is ${code}`, 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error occurred: ' + error.message);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

const sendGoDaddyEmail = (receiverEmail, receiverName, code) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: process.env.GODAAY_NOREPLY_EMAIL,
      pass: process.env.GODAAY_PASSWORD,
    },
    requireTLS: true
  });

  // Set up email data
  const mailOptions = {
    from: process.env.GODAAY_NOREPLY_EMAIL, 
    to: receiverEmail, 
    subject: 'TrustRealify [Verify Account]', 
    html: `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Verification Code</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: auto;
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #4caf50;
              text-align: center;
              text-shadow: 0 0 5px #4caf50, 0 0 10px #4caf50, 0 0 15px #4caf50,
                0 0 20px #00ff00, 0 0 30px #00ff00; /* LED effect */
              animation: glow 1s infinite alternate;
            }
            @keyframes glow {
              0% {
                text-shadow: 0 0 5px #4caf50, 0 0 10px #4caf50, 0 0 15px #4caf50;
              }
              50% {
                text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
              }
              100% {
                text-shadow: 0 0 15px #4caf50, 0 0 25px #4caf50, 0 0 35px #00ff00;
              }
            }
            .content {
              margin: 20px 0;
              font-size: 16px;
              line-height: 1.5;
              color: #555;
            }
            .code {
              font-size: 24px;
              font-weight: bold;
              color: #4caf50;
              text-align: center;
              margin: 20px 0;
              padding: 10px;
              border: 2px solid #4caf50;
              border-radius: 5px;
              display: inline-block; /* Centering the code block */
            }
            .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Trust Realify</h1>
            <div class="content">
              <p>Dear <strong>${receiverName}</strong>,</p>
              <p>
                Thank you for registering with us. Please use the following
                verification code to complete your registration:
              </p>
              <div class="code">${code}</div>
              <p>If you did not request this code, please ignore this message.</p>
            </div>
            <div class="footer">
              &copy; 2025 trustyrealify.com. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `, 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error occurred: ' + error.message);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

module.exports = { sendGmail, sendGoDaddyEmail };