const Users = require("../models/user")
const mail = require("../controller/transferMail")
const transfer = async (req) => {
    const recepient = req.body.recepient;
    const amount = req.body.amount;
    const userid = req.user.id;
    const sender = await Users.findOne({
        _id: userid
    });
    const recepientcheck = await Users.findOne({
        username: recepient
    });
    if (recepientcheck) {
        try {
            if (amount <= sender.amount) {
                sender.amount = sender.amount - amount;
                recepientcheck.amount = recepientcheck.amount + amount;
                sender.save();
                recepientcheck.save();
                //Send Mail
                mail.transferSuccessMail(sender.email, amount, recepient);

            } else {
                mail.transferFailureMail(sender.email, amount, recepient, "not having enough balance");
                console.log("Not enough balance");
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("Recepient not found");
    }

}
module.exports = {
    transfer
}