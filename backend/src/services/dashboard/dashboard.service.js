const sheetModel = require("../../models/sheetModel");

module.exports = {
    getAllExpenseSheets: async (userId) => {
        return await sheetModel.find({ userId, type: 'Expense' });
    },
    getAllIncomeSheets: async (userId) => {
        return await sheetModel.find({ userId, type: 'Income' });
    },

}