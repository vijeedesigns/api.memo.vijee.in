// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const AncestryModel = new Schema({
    guid: { type: String, required: true },
    name: { type: String, required: true },
    familyName: { type: String, required: false },
    gender: { type: String, required: true },
    parents: { type: Array, required: false },
    spouse: { type: Array, required: false },
    children: { type: Array, required: false },
    profileImage: { type: String, required: false }
});

module.exports = mongoose.model("memo-ancestry", AncestryModel);