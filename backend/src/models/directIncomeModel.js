const mongoose = require("mongoose");

const DirectIncomeSchema = new mongoose.Schema(
  {
    incomeFrom: {
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
    incomeCategory: {
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

module.exports = mongoose.model("DirectIncome", DirectIncomeSchema);
