const { sheetService } = require("../../services");
const ApiError = require("../../utils/handlers/ApiError.handler");
const ApiResponse = require("../../utils/handlers/ApiResponse.handler");
const { AsyncHandler } = require("../../utils/handlers/Async.handler");

module.exports = {
    create: AsyncHandler(async (req, res) => {
        // const { name, type, columns[0], entries[0] } = req.body;
        const userId = req.user.userId; // Extract user ID from token
        if (!userId) {
            throw new ApiError('User ID not found in token.');
        }
        const sheetData = req.body;

        // Call the service function to create the sheet
        await sheetService.create(sheetData, userId);
        res
            .status(201)
            .json(
                new ApiResponse(201, {}, 'Sheet created successfully.')
            );
    })
}