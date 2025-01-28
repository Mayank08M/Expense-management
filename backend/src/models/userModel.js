const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: Number,
        default: 0 // default is user
    }

})

module.exports = mongoose.model('User', userSchema);