// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const MonthlyExpenseStatusModel = new Schema({
    guid: { type: String, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    values: { type: Array, required: true }
});

module.exports = mongoose.model("memo-monthly-expense-status", MonthlyExpenseStatusModel);