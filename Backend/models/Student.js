const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Add this line to import Schema

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D', 'F'],
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
