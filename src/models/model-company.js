// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const CompanyModel = new Schema({
    guid: { type: String, required: true },
    name: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: false },
    type: { type: String, required: true },
    role: { type: String, required: true },
    tag: { type: String, required: true },
    color: { type: String, required: true }
});

module.exports = mongoose.model("memo-companies", CompanyModel);