const directExpenseModel = require("../../models/directExpenseModel");
const directIncomeModel = require("../../models/directIncomeModel");
const sheetModel = require("../../models/sheetModel");
const { startOfMonth, subMonths } = require("date-fns");  // ✅ Use require instead of import

module.exports = {
    getAllExpenseSheets: async (userId) => {
        return await sheetModel.find({ userId, type: "Expense" });
    },
    getAllIncomeSheets: async (userId) => {
        return await sheetModel.find({ userId, type: "Income" });
    },
    getSheetDataFromDate: async (userId, startDate, endDate) => {
        return await sheetModel.find({
            userId,
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        });
    },

    getSheetDataLast5Months: async (userId) => {
        const { ObjectId } = require("mongodb");
        const fiveMonthsAgo = new Date();
        fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);
        fiveMonthsAgo.setHours(0, 0, 0, 0); // Normalize time

        const result = await sheetModel.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId), // Ensure correct ObjectId conversion
                    createdAt: { $gte: fiveMonthsAgo }
                }
            },
            {
                $unwind: {
                    path: "$entries",
                    preserveNullAndEmptyArrays: false // Ensures only sheets with entries are considered
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalIncome: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "Income"] },
                                { $toDouble: { $ifNull: [{ $toString: "$entries.amount" }, "0"] } },
                                0
                            ]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "Expense"] },
                                { $toDouble: { $ifNull: [{ $toString: "$entries.amount" }, "0"] } },
                                0
                            ]
                        }
                    }
                }
            },
            {
                $sort: { "_id.year": -1, "_id.month": -1 } // Sort months in descending order
            }
        ]);

        return result;
    },

    getDirectExpenseIncomeLast5Months: async (userId) => {
        const { ObjectId } = require("mongodb");
        const userObjectId = new ObjectId(userId);
        const lastFiveMonths = [];
    
        for (let i = 4; i >= 0; i--) {
            lastFiveMonths.push(startOfMonth(subMonths(new Date(), i)));
        }
    
        const aggregationPipeline = [
            {
                $match: {
                    userId: userObjectId,
                    createdAt: { $gte: lastFiveMonths[0] }, // Only last 5 months
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $project: {
                    _id: 1, // Keep _id as { year, month }
                    totalAmount: 1,
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sort in ascending order
        ];
    
        // Fetch direct expenses and incomes
        const [directExpenses, directIncomes] = await Promise.all([
            directExpenseModel.aggregate(aggregationPipeline),
            directIncomeModel.aggregate(aggregationPipeline),
        ]);
    
        // Convert expenses and incomes into a unified structure
        const mergedData = {};
    
        directExpenses.forEach((expense) => {
            const key = `${expense._id.year}-${expense._id.month}`;
            if (!mergedData[key]) {
                mergedData[key] = { _id: expense._id, totalDirectExpense: 0, totalDirectIncome: 0 };
            }
            mergedData[key].totalDirectExpense = expense.totalAmount;
        });
    
        directIncomes.forEach((income) => {
            const key = `${income._id.year}-${income._id.month}`;
            if (!mergedData[key]) {
                mergedData[key] = { _id: income._id, totalDirectExpense: 0, totalDirectIncome: 0 };
            }
            mergedData[key].totalDirectIncome = income.totalAmount;
        });
    
        return Object.values(mergedData);
    },

    getSheetDataLast30Days: async (userId) => {
        const { ObjectId } = require("mongodb");
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0); // Normalize time to start of the day

        const result = await sheetModel.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId), // Ensure correct ObjectId conversion
                    createdAt: { $gte: thirtyDaysAgo } // Filter data from last 30 days
                }
            },
            {
                $unwind: {
                    path: "$entries",
                    preserveNullAndEmptyArrays: false // Ensures only sheets with entries are considered
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" } // Group by day for last 30 days data
                    },
                    totalIncome: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "Income"] },
                                { $toDouble: { $ifNull: [{ $toString: "$entries.amount" }, "0"] } },
                                0
                            ]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "Expense"] },
                                { $toDouble: { $ifNull: [{ $toString: "$entries.amount" }, "0"] } },
                                0
                            ]
                        }
                    }
                }
            },
            {
                $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } // Sort by date in descending order
            }
        ]);

        return result;
    }







};
