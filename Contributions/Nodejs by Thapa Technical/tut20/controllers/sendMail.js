const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    //* connect with smtp
    let transporter = await nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: 'vergie38@ethereal.email', 
        pass: '7t9qqNtkb3XFDJsrfx', 
      },
    });
  
    let info = await transporter.sendMail({
      from: '"Vishal Kumar 🌍" <yadav11adu@gmail.com>', 
      to: "yadav11adu@gmail.com", 
      subject: "Hello ✔ from 🐹🔥", 
      text: "Hello world?", 
      html: "<b>Hello world?</b>",
    });
  
    console.log("Message sent: %s", info.messageId);
  
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendMail