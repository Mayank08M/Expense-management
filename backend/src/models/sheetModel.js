const mongoose = require("mongoose");

const expenseCategories = ["Essentials", "Investments", "Entertainment", "other"];
const incomeCategories = ["Job", "Side hustle", "Investments", "Other"];

const SheetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        type: {
            type: String,
            required: true,
            enum: ["Expense", "Income"],
        },
        columns: {
            type: [String], // Array of column names (user-defined)
            validate: {
                validator: function (arr) {
                    return arr.includes("category") && arr.length >= 1 && arr.length <= 10;
                },
                message:
                    "Number of columns must be between 1 and 10 and must include 'category'",
            },
            default: ["category"], // Ensure "category" is always included
        },
        entries: [
            {
                type: Map,
                of: String, // Key-value storage (column names as keys)
                validate: {
                    validator: function (entry) {
                        const category = entry.get("category");
                        if (!category) return false; // Category must exist in each entry
                        if (this.type === "Expense") {
                            return expenseCategories.includes(category);
                        } else if (this.type === "Income") {
                            return incomeCategories.includes(category);
                        }
                        return false;
                    },
                    message: "Invalid category for the given sheet type.",
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Sheet", SheetSchema);
