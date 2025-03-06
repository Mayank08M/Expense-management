const { updateSearchIndex } = require("../../models/userModel");
const { dashboardService, directExpenseService, directIncomeService } = require("../../services");
const ApiError = require("../../utils/handlers/ApiError.handler");
const ApiResponse = require("../../utils/handlers/ApiResponse.handler");
const { AsyncHandler } = require("../../utils/handlers/Async.handler");

module.exports = {
    getCategoryWiseExpenseData: AsyncHandler(async (req, res) => {
        const userId = req.user.userId;
        if (!userId) {
            throw new ApiError(401, 'User not found.');
        }

        // Fetch all expense sheets for the user
        const expenseSheetsData = await dashboardService.getAllExpenseSheets(userId);
        const directExpenseData = await directExpenseService.getAllData(userId);

        if (!expenseSheetsData.length && !directExpenseData.length) {
            throw new ApiError(404, 'Make a sheet or add direct expenses to get data.');
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

        directExpenseData.forEach(expense => {
            const category = expense.expenseCategory;
            const amount = parseFloat(expense.amount); // Convert amount to number

            if (!categoryTotals[category]) {
                categoryTotals[category] = 0;
            }
            categoryTotals[category] += amount;
            overallTotal += amount;
        });

        // Calculate percentage for each category
        const categoryPercentages = Object.keys(categoryTotals).map(category => {
            const totalSpent = categoryTotals[category] || 0;
            return {
                category,
                totalSpent,
                percentage: totalSpent > 0
                    ? ((totalSpent / overallTotal) * 100).toFixed(2) + '%'
                    : "Please add an entry with Amount to get data"
            };
        });

        res.status(200).json(
            new ApiResponse(200, categoryPercentages, 'Category-wise expenses retrieved successfully.')
        );
    }),

    getCategoryWiseIncomeData: AsyncHandler(async (req, res) => {
        const userId = req.user.userId;
        if (!userId) {
            throw new ApiError(401, 'User not found.');
        }

        // Fetch all income sheets and direct income for the user
        const incomeSheetsData = await dashboardService.getAllIncomeSheets(userId);
        const directIncomeData = await directIncomeService.getAllData(userId);

        if (!incomeSheetsData.length && !directIncomeData.length) {
            throw new ApiError(404, 'Make a sheet or add direct income to get data.');
        }

        let categoryTotals = {};
        let overallTotal = 0;

        // Process income sheets data
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

        // Process direct income data
        directIncomeData.forEach(income => {
            const category = income.incomeCategory;
            const amount = parseFloat(income.amount); // Convert amount to number

            if (!categoryTotals[category]) {
                categoryTotals[category] = 0;
            }
            categoryTotals[category] += amount;
            overallTotal += amount;
        });

        // Calculate percentage for each category
        const categoryPercentages = Object.keys(categoryTotals).map(category => {
            const totalIncome = categoryTotals[category] || 0;
            return {
                category,
                totalIncome,
                percentage: totalIncome > 0
                    ? ((totalIncome / overallTotal) * 100).toFixed(2) + '%'
                    : "Please add an entry with Amount to get data"
            };
        });

        res.status(200).json(
            new ApiResponse(200, categoryPercentages, 'Category-wise income retrieved successfully.')
        );
    }),


    getLastFiveMonthData: AsyncHandler(async (req, res) => {
        const userId = req.user.userId;
        if (!userId) {
            throw new ApiError(401, 'User not found.');
        }

        // const result = await dashboardService.getSheetDataLast5Months(userId);
        const [result, directData] = await Promise.all([
            dashboardService.getSheetDataLast5Months(userId),
            dashboardService.getDirectExpenseIncomeLast5Months(userId)
        ])
        const isResultOnlyZeros = result.length > 0 && result.every(item => item.totalIncome === 0 && item.totalExpense === 0);

        if (isResultOnlyZeros && directData.length === 0) {
            return res.status(200).json(
                new ApiResponse(200, [], 'No data available for the last five months.')
            );
        }
        const directExpenses = Array.isArray(directData) ? directData.map(d => ({
            year: d._id?.year,
            month: d._id?.month,
            totalDirectExpense: d.totalDirectExpense
        })) : [];

        const directIncomes = Array.isArray(directData) ? directData.map(d => ({
            year: d._id?.year,
            month: d._id?.month,
            totalDirectIncome: d.totalDirectIncome
        })) : [];

        result.forEach((item) => {
            const directExpense = directExpenses.find(d => d.year === item._id.year && d.month === item._id.month);
            const directIncome = directIncomes.find(d => d.year === item._id.year && d.month === item._id.month);

            // Get direct expenses and income
            const totalDirectExpense = directExpense ? directExpense.totalDirectExpense : 0;
            const totalDirectIncome = directIncome ? directIncome.totalDirectIncome : 0;

            // Update totalExpense and totalIncome directly
            item.totalExpense += totalDirectExpense;
            item.totalIncome += totalDirectIncome;

            // Remove unwanted fields
            delete item.totalDirectExpense;
            delete item.totalDirectIncome;
        });

        res.status(200).json(
            new ApiResponse(200, result, 'Data retrieved successfully.')
        );
    }),

    getLastThirtyDaysData: AsyncHandler(async (req, res) => {
        const userId = req.user.userId;
        if (!userId) {
            throw new ApiError(401, 'User not found.');
        }

        const result = await dashboardService.getSheetDataLast30Days(userId);
        const directDataResult = await dashboardService.getDirectDataLast30Days(userId);

        const mergedData = [...result, ...directDataResult].reduce((acc, curr) => {
            const key = `${curr._id.year}-${curr._id.month}-${curr._id.day}`;
            if (!acc[key]) {
                acc[key] = { _id: curr._id, totalIncome: 0, totalExpense: 0 };
            }
            if (curr.totalIncome) acc[key].totalIncome += curr.totalIncome;
            if (curr.totalExpense) acc[key].totalExpense += curr.totalExpense;
            return acc;
        }, {});

        const finalResult = Object.values(mergedData).sort((a, b) =>
            new Date(b._id.year, b._id.month - 1, b._id.day) - new Date(a._id.year, a._id.month - 1, a._id.day)
        );

        res.status(200).json(
            new ApiResponse(200, finalResult, 'Data retrieved successfully.')
        );
    }),

}