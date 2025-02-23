const directExpenseModel = require("../../models/directExpenseModel");

module.exports = {
  create: async (data) => {
    return await directExpenseModel.create(data);
  },
};
