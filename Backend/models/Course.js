const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
