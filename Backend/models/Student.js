const mongoose = require('mongoose');

const { Schema } = mongoose;

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
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
