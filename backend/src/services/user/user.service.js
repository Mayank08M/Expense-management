const userModel = require("../../models/userModel");

module.exports = {
    getById: async(id) => {
        return await userModel.findById(id);
    }
}