// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const TransactionReviewModel = new Schema({
    guid: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    credits: { type: Object, required: true },
    debits: { type: Object, required: true }
});

module.exports = mongoose.model("memo-transaction-review", TransactionReviewModel);