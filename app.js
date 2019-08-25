
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/contactform', (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const output = `
                    <p>You have a new contact request</p>
                    <h3>Contact Details</h3>
                    <ul>  
                      <li>Name: ${req.body.name}</li>
                      <li>Email: ${req.body.email}</li>
                    </ul>
                    <h3>Message</h3>
                    <p>${req.body.messages}</p>
                  `;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'gardner85@ethereal.email',
          pass: 'CEfc6ZJ7DhQJmSxFEe'
      }
  });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Nodemailer Contact" <test@email.com>', // sender address
      to: 'gardner85@ethereal.email', // list of receivers
      replyTo : 'test@email.com',
      subject: 'contact form sample for client', // Subject line
      text: req.body.message, // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', { msg: 'Email has been sent' });
    });
  });

});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server started... ${PORT}`));