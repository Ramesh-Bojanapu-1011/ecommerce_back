import { createTransport } from 'nodemailer';
import asyncHandler from 'express-async-handler';

const sendEmail = asyncHandler(async (data) => {
  const transporter = createTransport({
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

export default sendEmail;
