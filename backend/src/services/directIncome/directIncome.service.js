const directIncomeModel = require("../../models/directIncomeModel");

module.exports = {
  create: async (data) => {
    return await directIncomeModel.create(data);
  },
};
