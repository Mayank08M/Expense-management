const { sheetService } = require("../../services");
const ApiError = require("../../utils/handlers/ApiError.handler");
const ApiResponse = require("../../utils/handlers/ApiResponse.handler");
const { AsyncHandler } = require("../../utils/handlers/Async.handler");
const { v4: uuidv4 } = require('uuid');

const expenseCategories = ["Essentials", "Investments", "Entertainment", "Other"];
const incomeCategories = ["Job", "Side hustle", "Investments", "Other"];

// Function to validate the category based on the sheet type
const validateCategory = (entry, sheetType) => {
    const category = entry.category;

    if (!category) {
        throw new ApiError(400, "Category is required.");
    }

    if (sheetType === "Expense") {
        if (!expenseCategories.includes(category)) {
            throw new ApiError(400, `Invalid category. Valid categories are only Essentials, Investments, Entertainment and Other.`);
        }
    } else if (sheetType === "Income") {
        if (!incomeCategories.includes(category)) {
            throw new ApiError(400, `Invalid category. Valid categories are only Job, Side hustle, Investments and Other.`);
        }
    } else {
        throw new ApiError(400, "Invalid sheet type.");
    }
};

module.exports = {
    getAllSheets: AsyncHandler(async (req, res) => {
        const userId = req.user.userId; // Extract user ID from token
        if (!userId) {
            throw new ApiError(401, 'User ID not found in token.');
        }
        const sheets = await sheetService.getAllIncomeSheets(userId);
        if (!sheets[0]) {
            throw new ApiError(404, 'No sheets found.');
        }

        res
            .status(201)
            .json(
                new ApiResponse(201, sheets, 'Sheet retrieved successfully.')
            );
    }),

    getById: AsyncHandler(async (req, res) => {
        const userId = req.user.userId; // Extract user ID from token
        if (!userId) {
            throw new ApiError('User ID not found in token.');
        }
        const sheetId = req.params._id;
        const sheet = await sheetService.getIncomeSheetById(sheetId, userId);
        if (!sheet[0]) {
            throw new ApiError(404, 'Sheet not found.');
        }
        res
            .status(201)
            .json(
                new ApiResponse(201, sheet, 'Sheet retrieved successfully.')
            );
    }),

    createEntry: AsyncHandler(async (req, res) => {
        const userId = req.user?.userId; // Safely extract user ID
        const { _id } = req.params;

        if (!userId) {
            throw new ApiError(401, 'User not found.');
        }
        const sheet = await sheetService.getIncomeSheetById(_id, userId);

        if (!sheet || sheet.length === 0) { // Ensure sheet exists
            throw new ApiError(404, 'Sheet not found.');
        }

        try {
            validateCategory(req.body, sheet[0].type);
        } catch (err) {
            throw new ApiError(400, err.message);
        }

        const entryId = uuidv4();

        const entryData = { ...req.body, entryId };

        const result = await sheetService.createSheetEntry(entryData, userId, _id);

        res.status(201).json(new ApiResponse(201, result, 'Entry created successfully.'));
    }),

};
