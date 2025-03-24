const nodemailer = require("nodemailer");
const { EMAIL_ENV } = require("../constants");

const transporter = nodemailer.createTransport({
  service: EMAIL_ENV.EMAIL_SERVICE,
  auth: {
    user: EMAIL_ENV.EMAIL_USER,
    pass: EMAIL_ENV.EMAIL_PASS,
  },
});

module.exports = transporter;
