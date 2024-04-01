// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const FinancialCalculationModel = new Schema({
    guid: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    emi: { type: Number, required: true },
    frequency: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    tenure: { type: Number, required: false },
    loanAmount: { type: Number, required: false },
    ROIChange: { type: Number, required: false }
});

module.exports = mongoose.model("memo-financial-calculation", FinancialCalculationModel);