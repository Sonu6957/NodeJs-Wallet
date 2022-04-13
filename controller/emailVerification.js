const User = require("../models/user")

const email_Verification = async (req, res) => {
    try {
        const token = req.query.token;
        const user = await User.findOne({
            email_token: token
        });
        if (user) {
            user.email_token = null;
            user.isVerified = true;
            await user.save();
            return res.json("You are verified")

        } else {
            return res.json("Please sign up");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = email_Verification;