const sheetModel = require("../../models/sheetModel");
/**
 * Create a new sheet
 * @param {Object} data - Sheet data from request body
 * @param {String} userId - User ID from token
 */

module.exports = {
    create: async (data, userId) => {
        const { name, type, columns, entries } = data;
        if (!columns.includes("Category")) {
            throw new Error("Columns must include 'Category'.");
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
    update: async (userId, sheetId, entryId, data) => {
        return await sheetModel.updateOne(
            { _id: sheetId, userId: userId, "entries.entryId": entryId }, // Find the sheet by ID and userId, and locate the specific entry
            { $set: { "entries.$": data } } // Update the matched entry with new data
        );
    },
    deleteEntry: async (userId, sheetId, entryId) => {
        return await sheetModel.updateOne(
            { _id: sheetId, userId: userId }, // Find the sheet by ID and userId
            { $pull: { entries: { entryId: entryId } } } // Remove only the matching entry inside entries array
        );
    },
    deleteAllEntries: async (userId, sheetId) => {
        return await sheetModel.updateOne(
            { _id: sheetId, userId },
            { $set: { entries: [] } } // Clears the entire entries array
        );
    },
    
    deleteSheet: async (userId, sheetId) => {
        return await sheetModel.deleteOne({ _id: sheetId, userId: userId });
    },


    getAllSheets: async (userId) => await sheetModel.find({ userId }).exec(),

    //expense services
    getAllExpenseSheets: async (userId) => await sheetModel.find({ userId, type: 'Expense' }),
    getExpenseSheetById: async (sheetId, userId) => await sheetModel.find({ userId, type: 'Expense', _id: sheetId }),
    createSheetEntry: async (data, userId, sheetId) => {
        const sheet = await sheetModel.findOneAndUpdate(
            { _id: sheetId, userId },
            { $push: { entries: data } },
            { new: true } // Returns updated document
        );

        if (!sheet) {
            throw new ApiError(404, "Sheet not found or unauthorized.");
        }

        // Retrieve the last inserted entry
        const newEntry = sheet.entries[sheet.entries.length - 1];

        return newEntry; // Return the new entry with entryId
    },


    //income services
    getAllIncomeSheets: async (userId) => await sheetModel.find({ userId, type: 'Income' }),
    getIncomeSheetById: async (sheetId, userId) => await sheetModel.find({ userId, type: 'Income', _id: sheetId }),


}