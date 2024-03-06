// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const PayslipModel = new Schema({
    guid: { type: String, required: true },
    url: { type: String, required: true },
    company: { type: String, required: true },
    date: { type: Date, required: true },
    ctc: { type: Number, required: true },
    net: { type: Number, required: true }
});

module.exports = mongoose.model("memo-payslips", PayslipModel);
