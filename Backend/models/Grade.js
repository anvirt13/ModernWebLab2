const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  gradeLetter: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D', 'F'],
  },
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
