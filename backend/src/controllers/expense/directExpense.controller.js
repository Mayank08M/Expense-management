const { AsyncHandler } = require("../../utils/handlers/Async.handler");
const ApiError = require("../../utils/handlers/ApiError.handler");
const ApiResponse = require("../../utils/handlers/ApiResponse.handler");
const { v4: uuidv4 } = require("uuid");
const { directExpenseService } = require("../../services");

module.exports = {
  create: AsyncHandler(async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
      throw new ApiError(401, "User not found.");
    }
    const { expenseCategory, paidFor, amount, description } = req.body;
    if (!expenseCategory || !paidFor || amount === undefined) {
      throw new ApiError(400,
        "Missing required fields: expenseCategory, paidFor, and amount are required."
      );
    }
    const entryId = uuidv4();
    const entryData = {
      entryId,
      userId,
      expenseCategory,
      paidFor,
      amount,
      description,
    };
    await directExpenseService.create(entryData);
    res
      .status(201)
      .json(new ApiResponse(201, {}, "Expense added successfully."));
  }),
};
