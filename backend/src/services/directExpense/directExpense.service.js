const directExpenseModel = require("../../models/directExpenseModel");

module.exports = {
  create: async (data) => {
    return await directExpenseModel.create(data);
  },
  getAllData: async (userId) => {
    return await directExpenseModel.find({ userId });
  },
  getAll: async (userId) => {
    const results = await directExpenseModel
      .find({ userId }, { paidFor: 1, entryId: 1, expenseCategory: 1, amount: 1, description: 1 }) // Include fields
      .sort({ createdAt: -1 })
      .lean();

    return results.map(item => ({
      entryId: item.entryId,
      "Paid For": item.paidFor,
      "Expense Category": item.expenseCategory,
      "Amount": item.amount,
      "Description": item.description
    }));
  },
  update: async (userId, entryId, paidFor, expenseCategory, amount, description) => {
    return await directExpenseModel.updateOne({ userId, entryId }, {
      $set: {
        paidFor,
        expenseCategory,
        amount,
        description
      }
    });
  },

  delete: async (userId, entryId) => {
    return await directExpenseModel.deleteOne({ userId, entryId });
  },
  deleteAll: async (userId) => {
    return await directExpenseModel.deleteMany({ userId });
  }
};
