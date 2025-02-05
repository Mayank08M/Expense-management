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
    }
}