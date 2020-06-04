const nodemailer = require('nodemailer');
     
const sendEmail = async options => {
  console.log(options);
  // Create Transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail' , 
    host: process.env.EMAIL_HOST ,
    port: process.env.EMAIL_PORT ,
    auth: {
      user: process.env.EMAIL_USERNAME ,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  // Emails Format
  const mailOptions = {
    from: 'Roco Sifredi <rogo@sifredi.io>' ,
    to: options.email ,
    subject: options.subject ,
    text: options.message
  }
  // Send Emails
  await transporter.sendMail(mailOptions)
}
 
module.exports = sendEmail;