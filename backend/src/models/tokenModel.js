const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    expires: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isblacklisted: {
        type: Boolean,
        default: 0,
        required: true,
    }

})

module.exports = mongoose.model('Token', tokenSchema);