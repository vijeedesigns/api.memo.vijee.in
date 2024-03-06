// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const PhotoModel = new Schema({
    exifdata: { type: Object, required: true },
    guid: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    name: { type: String, required: true },
    place: { type: String, required: true },
    path: { type: String, required: true }
});

module.exports = mongoose.model("memo-photos", PhotoModel);
