// EmailService.js
import nodemailer from "nodemailer";
import mailgunTransport from "nodemailer-mailgun-transport";
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from "../config/keys";

// Configure transport options
const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY || MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN || MAILGUN_DOMAIN
  }
};

const transport = mailgunTransport(mailgunOptions);

// EmailService
class EmailService {
  constructor() {
    this.emailClient = nodemailer.createTransport(transport);
  }

  sendText(to, subject, text) {
    return new Promise((resolve, reject) => {
      this.emailClient.sendMail(
        {
          from: '"CIIP" <no-reply@myciip.com>',
          to,
          subject,
          text
        },
        (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        }
      );
    });
  }
}

module.exports = new EmailService();
