const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")


const Route = require("./routes/Route");
const Authentication = require('./controller/verifyToken');
const {
    cookie
} = require("express/lib/response");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser())
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connection successfull")
}).catch((err) => {
    console.log(err);
});
app.use("/transfer", Authentication, Route)
app.use(Route);


app.listen(3000, () => {
    console.log("Server is running")
})