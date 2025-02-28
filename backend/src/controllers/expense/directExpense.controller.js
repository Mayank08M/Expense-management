const { AsyncHandler } = require("../../utils/handlers/Async.handler");
const ApiError = require("../../utils/handlers/ApiError.handler");
const ApiResponse = require("../../utils/handlers/ApiResponse.handler");
const { v4: uuidv4 } = require("uuid");
const { directExpenseService } = require("../../services");

const expenseCategories = ["Essentials", "Investments", "Entertainment", "Other"];

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

  getAllDirectExpenses: AsyncHandler(async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
      throw new ApiError(401, 'User not found.');
    }

    const result = await directExpenseService.getAll(userId);

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
      ["Expense Category"]: expenseCategory,
      ["Paid For"]: paidFor
    } = data;
    if (!userId) {
      throw new ApiError(401, 'User not found.');
    }
    if (!expenseCategories.includes(expenseCategory)) {
      throw new ApiError(400, `Invalid Expense Category. Allowed values are: ${expenseCategories.join(", ")}`);
    }
    const result = await directExpenseService.update(userId, entryId, paidFor, expenseCategory, amount, description);
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
    await directExpenseService.delete(userId, entryId);
    res
      .status(200)
      .json(new ApiResponse(200, {}, 'Data deleted successfully.'));
  }),

  deleteAll: AsyncHandler(async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
      throw new ApiError(401, 'User not found.');
    }
    await directExpenseService.deleteAll(userId);
    res
      .status(200)
      .json(new ApiResponse(200, {}, 'Data deleted successfully.'));
  })
};
