const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const app = express();

const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.post('/api/form', (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <h3>Contact Details</h3>
    <ul>
      <li><strong>Name:</strong> ${req.body.name}</li>
      <li><strong>Email:</strong> ${req.body.email}</li>
    </ul>
    <h3>Messge</h3>
    <p>${req.body.message}</p>
    `
    let auth = {
      auth: {
        api_key: '35bc16fbb07add97a10d422e6dc18c3d-3b1f59cf-a73c20f0',
        domain: 'sandbox50d788b4c7554c99a7b3be40581aab58.mailgun.org',
      },
      proxy: false,
    }
    let nodemailerMailgun = nodemailer.createTransport(mg(auth));

  //   let transporter = nodemailer.createTransport({
  //     service: 'SMTP',
  //     host: 'smtp.mailgun.org',
  //     port: 465,
  //     secure: true, // true for 465, false for other ports
  //     auth: {
  //         user: '', // generated ethereal user
  //         pass: '' // generated ethereal password
  //     },
  //   //   tls: {
  //   //     rejectUnauthorized: false
  //   // }
  // });

  let mailOptions = {
    from: 'Contact - React App <noreply@designpk.com>', // sender address
    to: 'patrick.kurzeja@gmail.com', // list of receivers - my email in that case
    subject: 'Message from site', // Subject line
    text: req.body.message, // plain text body
    html: htmlEmail // html body
};

nodemailerMailgun.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
  })
});



app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})