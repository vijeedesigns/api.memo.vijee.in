// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const ExpenseModel = new Schema({
    guid: { type: String, required: true },
    account: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    comment: { type: String, required: true },
    reviewType: { type: String, required: false }
});

module.exports = mongoose.model("memo-expenses", ExpenseModel);