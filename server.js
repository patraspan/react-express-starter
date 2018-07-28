const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport'); // don't forget to 'npm i nodemailer-mailgun-transport'
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
        api_key: '987YourApiKeyHere654-123456789',
        domain: 'domainCreatedByMailgun.mailgun.org',
      },
      proxy: false, // 'http://user:pass@localhost:8080' it is optional
    }
    let nodemailerMailgun = nodemailer.createTransport(mg(auth));

  let mailOptions = {
    from: 'Contact - React App <noreply@eample.com>', // sender address - You can write here whatever, it is name of email sender 
    to: 'example@email.com', // list of receivers (in array if many)
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
});