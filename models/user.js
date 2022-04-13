const mongoose = require('mongoose');

const user_Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 100
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    email_token: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("user", user_Schema);