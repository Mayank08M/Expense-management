const tokenModel = require("../../models/tokenModel");

module.exports = {
    get: async (refreshToken) => {
        return await tokenModel.findOne({
            token: refreshToken,
            isblacklisted: false,
        });
    },

    logout: async (userId) => {
        return await tokenModel.updateOne(
            { userId: userId }, // Find token by userId
            { $set: { isblacklisted: true } } // Update isblacklisted field
        );
    },
};
