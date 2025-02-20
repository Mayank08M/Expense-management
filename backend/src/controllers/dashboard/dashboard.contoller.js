const { dashboardService } = require("../../services");
const ApiError = require("../../utils/handlers/ApiError.handler");
const ApiResponse = require("../../utils/handlers/ApiResponse.handler");
const { AsyncHandler } = require("../../utils/handlers/Async.handler");

module.exports = {
    getCategoryWiseExpenseData: AsyncHandler(async (req, res) => {
        const userId = req.user.userId;
        if (!userId) {
            throw new ApiError('User not found.');
        }
    
        // Fetch all expense sheets for the user
        const expenseSheetsData = await dashboardService.getAllExpenseSheets(userId);
        
        if (!expenseSheetsData.length) {
            throw new ApiError(404, 'Make a sheet to get data.');
        }
    
        let categoryTotals = {};
        let overallTotal = 0;
    
        expenseSheetsData.forEach(sheet => {
            sheet.entries.forEach(entry => {
                const category = entry.category;
                const amount = parseFloat(entry.amount); // Convert amount to number
                
                if (!categoryTotals[category]) {
                    categoryTotals[category] = 0;
                }
                categoryTotals[category] += amount;
                overallTotal += amount;
            });
        });
    
        // Calculate percentage for each category
        const categoryPercentages = Object.keys(categoryTotals).map(category => {
            const totalSpent = categoryTotals[category] || 0;
            return {
                category,
                totalSpent,
                percentage: totalSpent > 0 
                    ? ((totalSpent / overallTotal) * 100).toFixed(2) + '%' 
                    : "Please add a entry with Amount to get data"
            };
        });
    
        res.status(200).json(
            new ApiResponse(200, categoryPercentages, 'Category-wise expenses retrieved successfully.')
        );
    }),

    getCategoryWiseIncomeData: AsyncHandler(async (req, res) => {
        const userId = req.user.userId;
        if (!userId) {
            throw new ApiError('User not found.');
        }
    
        // Fetch all expense sheets for the user
        const incomeSheetsData = await dashboardService.getAllIncomeSheets(userId);
        
        if (!incomeSheetsData.length) {
            throw new ApiError(404, 'Make a sheet to get data.');
        }
    
        let categoryTotals = {};
        let overallTotal = 0;
    
        incomeSheetsData.forEach(sheet => {
            sheet.entries.forEach(entry => {
                const category = entry.category;
                const amount = parseFloat(entry.amount); // Convert amount to number
                
                if (!categoryTotals[category]) {
                    categoryTotals[category] = 0;
                }
                categoryTotals[category] += amount;
                overallTotal += amount;
            });
        });
    
        // Calculate percentage for each category
        const categoryPercentages = Object.keys(categoryTotals).map(category => {
            const totalSpent = categoryTotals[category] || 0;
            return {
                category,
                totalSpent,
                percentage: totalSpent > 0 
                    ? ((totalSpent / overallTotal) * 100).toFixed(2) + '%' 
                    : "Please add a entry with Amount to get data"
            };
        });
    
        res.status(200).json(
            new ApiResponse(200, categoryPercentages, 'Category-wise income retrieved successfully.')
        );
    }),

    getLastFiveMonthData: AsyncHandler(async(req, res)=> {
        const userId = req.user.userId;
        if (!userId) {
            throw new ApiError('User not found.');
        }

        const result = await dashboardService.getSheetDataLast5Months(userId);
        
        res.status(200).json(
            new ApiResponse(200, result, 'Data retrieved successfully.')
        );
    })
    
}