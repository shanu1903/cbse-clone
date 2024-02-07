const mongoose = require('mongoose');

// Define a simple schema and model


const Schema = mongoose.Schema;
const studentSchema = new Schema({
    rollNumber : String,
    schoolNumber : String,
    admitCardId : String,
    dob : Number,
    createdAt : Number
});
const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel