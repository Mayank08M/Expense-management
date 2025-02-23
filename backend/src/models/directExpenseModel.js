const mongoose = require("mongoose");

const DirectExpenseSchema = new mongoose.Schema(
  {
    paidFor: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    entryId: {
      type: String,
      require: true,
    },
    expenseCategory: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DirectExpense", DirectExpenseSchema);
