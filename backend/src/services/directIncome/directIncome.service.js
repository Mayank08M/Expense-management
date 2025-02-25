const directIncomeModel = require("../../models/directIncomeModel");

module.exports = {
  create: async (data) => {
    return await directIncomeModel.create(data);
  },
  getAll: async (userId) => {
    const results = await directIncomeModel
      .find({ userId }, { incomeFrom: 1, entryId: 1, incomeCategory: 1, amount: 1, description: 1 }) // Include fields
      .sort({ createdAt: -1 })
      .lean();

    return results.map(item => ({
      entryId: item.entryId,
      "Income From": item.incomeFrom,
      "Income Category": item.incomeCategory,
      "Amount": item.amount,
      "Description": item.description
    }));
  },

  update: async (userId, entryId, incomeFrom, incomeCategory, amount, description) => {
    return await directIncomeModel.updateOne({ userId, entryId }, {
      $set: {
        incomeFrom,
        incomeCategory,
        amount,
        description
      }
    });
  },

  delete: async(userId, entryId) => {
    return await directIncomeModel.deleteOne({ userId, entryId });
  },
  deleteAll: async (userId) => {
    return await directIncomeModel.deleteMany({ userId });
  }  
};
