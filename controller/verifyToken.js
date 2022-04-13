const jwt = require("jsonwebtoken");

const verifyToken = ((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.jwt_key, (err, user) => {
            if (err) {
                res.clearCookie("token");
                return res.status(403).json("Token not valid");
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        res.clearCookie("token");
        console.log("Token not available")


    }
})
module.exports = verifyToken;