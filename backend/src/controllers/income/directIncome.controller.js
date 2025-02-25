const { AsyncHandler } = require("../../utils/handlers/Async.handler");
const ApiError = require("../../utils/handlers/ApiError.handler");
const ApiResponse = require("../../utils/handlers/ApiResponse.handler");
const { v4: uuidv4 } = require("uuid");
const { directIncomeService } = require("../../services");

module.exports = {
  create: AsyncHandler(async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
      throw new ApiError(401, "User not found.");
    }
    const { incomeCategory, incomeFrom, amount, description } = req.body;
    if (!incomeCategory || !incomeFrom || amount === undefined) {
      throw new ApiError(400,
        "Missing required fields: incomeCategory, incomeFrom, and amount are required.",
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

  getAllDirectIncomes: AsyncHandler(async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
      throw new ApiError(401, 'User not found.');
    }

    const result = await directIncomeService.getAll(userId);

    if (!result || result.length === 0) {
      throw new ApiError(404, 'No Data found.');
    }

    res.status(200).json(
      new ApiResponse(200, result, 'Data retrieved successfully.')
    );
  }),

  updateEntry: AsyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { entryId, data } = req.body;
    const {
      Amount: amount,
      Description: description,
      ["Income Category"]: incomeCategory,
      ["Income From"]: incomeFrom
    } = data;
    if (!userId) {
      throw new ApiError(401, 'User not found.');
    }
    const result = await directIncomeService.update(userId, entryId, incomeFrom, incomeCategory, amount, description);
    res.status(200).json(
      new ApiResponse(200, {}, 'Data updated successfully.')
    );
  }),

  deleteEntry: AsyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { entryId } = req.body;
    if (!userId) {
      throw new ApiError(401, 'User not found.');
    }
    await directIncomeService.delete(userId, entryId);
    res
     .status(200)
     .json(new ApiResponse(200, {}, 'Data deleted successfully.'));
  }),

  deleteAll: AsyncHandler(async(req, res)=> {
    const userId = req.user.userId;
    if (!userId) {
      throw new ApiError(401, 'User not found.');
    }
    await directIncomeService.deleteAll(userId);
    res
     .status(200)
     .json(new ApiResponse(200, {}, 'Data deleted successfully.'));
  })
};
