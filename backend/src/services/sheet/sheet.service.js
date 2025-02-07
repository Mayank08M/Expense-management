const sheetModel = require("../../models/sheetModel");
/**
 * Create a new sheet
 * @param {Object} data - Sheet data from request body
 * @param {String} userId - User ID from token
 */ 

module.exports = {
    create: async (data, userId) => {
        const { name, type, columns, entries } = data;
        if (!columns.includes("category")) {
            throw new Error("Columns must include 'category'.");
        }
        const sheet = await sheetModel.create({
            name,
            type,
            userId,
            columns,
            entries,
        });

        return sheet;
    },
    getAllSheets: async (userId) => await sheetModel.find({ userId }).exec(),
    getAllExpenseSheets: async (userId) => await sheetModel.find({ userId, type: 'Expense' }),
    getExpenseSheetById: async (sheetId, userId) => await sheetModel.find({ userId, type: 'Expense', _id: sheetId }),
    createExpenseEntry: async (data, userId, sheetId) => {
        const sheet = await sheetModel.findOne({ _id: sheetId, userId });
    
        if (!sheet) {
            throw new ApiError(404, "Sheet not found or unauthorized.");
        }
        await sheetModel.updateOne(
            { _id: sheetId, userId },
            { $push: { entries: data } }
        );
    }
   

}