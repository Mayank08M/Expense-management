const { AsyncHandler } = require("../../utils/handlers/Async.handler");
const ApiError = require("../../utils/handlers/ApiError.handler");
const ApiResponse = require("../../utils/handlers/ApiResponse.handler");
const { v4: uuidv4 } = require("uuid");
const { directIncomeService } = require("../../services");

module.exports = {
  create: AsyncHandler(async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
      throw new ApiError("User not found.");
    }
    const { incomeCategory, incomeFrom, amount, description } = req.body;
    if (!incomeCategory || !incomeFrom || amount === undefined) {
      throw new ApiError(
        "Missing required fields: incomeCategory, incomeFrom, and amount are required.",
        400
      );
    }
    const entryId = uuidv4();
    const entryData = {
      entryId,
      userId,
      incomeCategory,
      incomeFrom,
      amount,
      description,
    };
    await directIncomeService.create(entryData);
    res
      .status(201)
      .json(new ApiResponse(201, {}, "Income added successfully."));
  }),
};
