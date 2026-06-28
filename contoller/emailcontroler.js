const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async (data) => {
  const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 587,
  secure: false, // true for port 465, false for 587
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: data.to,
    subject: data.subject,
    text: data.message,
    html: data.html
  };

  await transporter.sendMail(mailOptions);

  console.log('Email sent');
});

module.exports = sendEmail;
