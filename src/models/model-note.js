// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const NoteModel = new Schema({
    guid: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model("memo-notes", NoteModel);