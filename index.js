// const express = require('express')
// const cors = require('cors')
// const app = express()
// const nodemailer = require('nodemailer')
// app.use(express())
// app.use(express.json())
// // app.use(cors(
// //     {
// //         origin:"https://strategicinvestments.ae/"
// //     }
// // ))
// app.use(cors())
// app.listen(3000,()=>{
//     console.log('server is running');
// })
// const transporter = nodemailer.createTransport({
//     host: 'smtp.hostinger.com',
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//         user: 'info@strategicinvestments.ae', // One of your Hostinger emails
//         pass: 'Info1234567.' // The password for this specific email account
//     }
// });

// // Define a route to send emails
// app.post('/send-email', async (req, res) => {
//     const { to, subject, text, html } = req.body;

//     // Validate the "to" email address
//     const validEmails = ['info@strategicinvestments.ae', 'hr@strategicinvestments.ae'];
//     if (!validEmails.includes(to)) {
//         return res.status(400).send({ message: 'Invalid recipient email address' });
//     }

//     const mailOptions = {
//         from: 'your-email@yourdomain.com', // Sender address
//         to: to, // Recipient email address from request body
//         subject: subject, // Subject line
//         text: text, // Plain text body
//         html: html // HTML body
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         res.status(200).send({
//             message: 'Email sent successfully',
//             messageId: info.messageId
//         });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send({ message: 'Error sending email', error: error.message });
//     }
// });
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
// app.use(cors({
//     origin: 'https://strategicinvestments.ae'
// }));
app.use(cors())

// Configure Nodemailer for Hostinger's email service with Outlook
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'hr@strategicinvestments.ae', // Your email address registered on Hostinger
        pass: 'Hr@1234567.' // Your email password for Hostinger
    }
});

// Define a route to send emails
app.post('/send-email', async (req, res) => {
    console.log(req.body,'body');
    const { recipient, name, email, message } = req.body;

    // Validate the "recipient" email address
    const validEmails = ['info@strategicinvestments.ae', 'hr@strategicinvestments.ae'];
    if (!validEmails.includes(recipient)) {
        return res.status(400).send({ message: 'Invalid recipient email address' });
    }

    const mailOptions = {
        // from: email, // Sender address based on form input
        to: recipient, // Recipient email address based on form input
        subject: 'New Message from Contact Form', // Subject line
        text: `Name: ${name}\nFrom: ${email}\n\nMessage: ${message}`, // Plain text body
        html: `<p>Name: ${name}</p><p>From: ${email}</p><p>Message:</p><p>${message}</p>` // HTML body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).send({
            message: 'Email sent successfully',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Error sending email', error: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

