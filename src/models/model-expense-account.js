// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const ExpenseAccountModel = new Schema({
    guid: { type: String, required: true },
    name: { type: String, required: true },
    initialBalance: { type: Number, required: true },
    currentBalance: { type: Number, required: true },
    totalCredits: { type: Number, required: true },
    totalDebits: { type: Number, required: true },
    label: { type: String, required: true },
    icon: { type: String, required: true }
});

module.exports = mongoose.model("memo-expense-accounts", ExpenseAccountModel);