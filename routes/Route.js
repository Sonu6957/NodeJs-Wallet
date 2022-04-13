const express = require('express');
const router = express.Router();

const userController= require('../controller/user');
const email_Verification=require('../controller/emailVerification')
const amounttransfer=require("../controller/transfer");


//Register
router.post("/register",userController.postregister);
//Email-Verification
router.get("/email-verify",email_Verification);
//Login
router.post("/login", userController.postlogin)
//Transfer
router.post("/transfer",amounttransfer.transfer)


module.exports = router;