const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // Create Transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail' , 
    host: process.env.EMAIL_HOST ,
    port: process.env.EMAIL_PORT ,
    auth: {
      user: process.env.EMAIL_USERNAME ,
      password: process.env.EMAIL_PASSWORD
    }
  })
  // Emails Format
  const mailOptions = {
    from: 'Roco Sifredi <rogo@sifredi.io>' ,
    to: options.email ,
    to: options.subject ,
    to: options.message
  }
  // Send Emails
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;