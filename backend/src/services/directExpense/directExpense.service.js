const directExpenseModel = require("../../models/directExpenseModel");

module.exports = {
  create: async (data) => {
    return await directExpenseModel.create(data);
  },
  getAll: async (userId) => {
      const results = await directExpenseModel
        .find({ userId }, { _id: 0, userId: 0, entryId: 0, createdAt: 0, updatedAt: 0, __v: 0 }) // Exclude fields
        .sort({ createdAt: -1 })
        .lean();
  
      return results.map(item => ({
        "Paid For": item.paidFor,
        "Expense Category": item.expenseCategory,
        "Amount": item.amount,
        "Description": item.description
      }));
    },
};
