import nodemailer from 'nodemailer';

const emailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   authMethod: 'LOGIN',
//   logger: true,
//   debug: true,
// });
module.exports = emailTransporter;
