const nm = require('nodemailer')
const dotnev = require('dotenv');

const transporter = nm.createTransport({
    service: 'gmail',
    auth: {
        user: 'sonusagaraj6957@gmail.com',
        pass: process.env.email_pass
    },
    tls: {
        rejectUnauthorized: false
    }
})

const transferSuccessMail = (sender, amount, recepient) => {
    var mailOptions = {
        from: ' "Transcation Details"<sonusagaraj6957@gmail.com>',
        to: sender,
        subject: `Transaction Update`,
        html: `<h1> Your transaction was successful</h1>
                   <h2> Amount: ${amount} </h2><h2>To: ${recepient}</h2><br>
                   `

    }

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Success Transfer Email sent');
        }
    })
}

const transferFailureMail = (sender, amount, recepient, message) => {
    var mailFailure = {
        from: ' "Transcation Details"<sonusagaraj6957@gmail.com>',
        to: sender,
        subject: `Transaction Update`,
        html: `<h1> Your transaction was not successful due to ${message}</h1>
               <h2> Amount: ${amount} </h2><h2>To: ${recepient}</h2><br>
               `
    }

    transporter.sendMail(mailFailure, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Failure Transfer Email sent');
        }
    })
}




module.exports = {
    transferSuccessMail,
    transferFailureMail
}