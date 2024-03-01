const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL, EMAIL_SECURE_KEY } = process.env;

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_SECURE_KEY,
  },
};

const transporter = nodemailer.createTransport(config);
const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
