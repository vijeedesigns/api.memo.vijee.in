// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const DueModel = new Schema({
    guid: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    reason: { type: String, required: true },
    date: { type: Date, required: true },
    isPaid: { type: Boolean, required: true }
});

module.exports = mongoose.model("memo-dues", DueModel);