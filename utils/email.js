const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Raul M <${process.env.EMAIL_FROM}>`;
    this.x = true
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(subject) {
    // 1) Render HTML based on a pug template
    const htmlW = `<p>Hi ${this.firstName},</p>
      <p>Welcome to Freaking Tours, we're glad to have you</p> 🎉🙏
      <a href=${this.url} target='_blank'> Upload user photo</a>
      <p>If you need any help with your booking, please don't hesitate to contact us!</p>
    `;
    const htmlF = `<p>Hi ${this.firstName}</p>
      <p>Forgot your password? 
      Submit a PATCH request with your new password and passwordConfirm to: ${this.url}.</p>
      <a href=${this.url} target='_blank'> Reset your password</a>
      <p> If you didn't request a new password , please ignore this email</p>
    `;

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: this.x ? htmlW : htmlF ,
      text: htmlToText.fromString(htmlW)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    this.x = true
    await this.send('Welcome to the FreakingTours Family!');
  }

  async sendPasswordReset() {
    this.x = false
    await this.send('Forgot your password mate? no worries');
  }
};

