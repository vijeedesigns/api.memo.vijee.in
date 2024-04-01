// Require Mongoose
const mongoose = require("mongoose");

// Define user schema
const Schema = mongoose.Schema;

const TaskModel = new Schema({    
    guid: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    endDate: { type: Date, required: true },
    allDay: { type: Boolean, required: true },
    leaveType: { type: String, required: false },
    name: { type: String, required: true },
    time: { type: Number, required: true },
    duration: { type: Number, required: true },
    company: { type: String, required: true },
    repeat: { type: Number, required: false },
    description: { type: String, required: false },
    repeatDays: { type: Array, required: false },
    exceptionDates: { type: Array, required: false },
    interviewStatus: { type: Number, required: false },
    uploads: { type: Array, required: false }
});

module.exports = mongoose.model("memo-tasks", TaskModel);