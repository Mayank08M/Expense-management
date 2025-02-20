const sheetModel = require("../../models/sheetModel");

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

    console.log("Fetching data for user:", userId); // Debugging

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

    console.log("Aggregation Result:", JSON.stringify(result, null, 2)); // Debugging

    return result;
}






};
