const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport(config.email.smtp);

module.exports = { transporter };
