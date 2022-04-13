const User = require("../models/user");
const cryptojs = require("crypto-js");
const jwt = require('jsonwebtoken');
const nm = require('nodemailer')
const crypto = require('crypto')
const dotnev = require('dotenv');

const {
    nextTick
} = require("process");

dotnev.config();

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

const postregister = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptojs.AES.encrypt(
            req.body.password,
            process.env.crypt_sec
        ).toString(),
        email_token: crypto.randomBytes(64).toString('hex')
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
        var mailOptions = {
            from: ' "Verify your mail"<sonusagaraj6957@gmail.com>',
            to: req.body.email,
            subject: `User Verification`,
            html: `<h1> Please verify your mail</h1>
                   <h2> Thank you for login </h2><br>
                   <a href='http://${req.headers.host}/email-verify/?token=${newUser.email_token}'><h3>Click to verify </h3></a> `
        }
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Email sent');
            }
        })

    } catch (err) {
        console.log(err);

    }

}

const postlogin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if (!user) {
            return res.status(401).json("User not available");
        }
        const Originalpassword = cryptojs.AES.decrypt(user.password, process.env.crypt_sec).toString(cryptojs.enc.Utf8);
        if (Originalpassword !== req.body.password) {

            return res.status(402).json("Password does not match");

        }
        if (user.isVerified === false) {
            return res.status(401).json("Verify your mail");
        }
        const accessToken = jwt.sign({
                id: user._id
            },
            process.env.jwt_key, {
                expiresIn: "300s"
            }
        )

        res.cookie("token", accessToken, {
            httpOnly: true
        });

        res.json("Check cookie");
        next();

    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    postregister,
    postlogin
}