// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const MonthlyExpenseModel = new Schema({
    guid: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    months: { type: Array, required: true }
});

module.exports = mongoose.model("memo-monthly-expenses", MonthlyExpenseModel);