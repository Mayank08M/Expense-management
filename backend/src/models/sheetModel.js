const mongoose = require("mongoose");

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
          return arr.length >= 1 && arr.length <= 10;
        },
        message: "Number of columns must be between 1 and 10",
      },
      default: ["Category"], // Ensure "category" is always included
    },
    entries: [
      {
        type: Object, // Each entry is an object with keys corresponding to the column names
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sheet", SheetSchema);
