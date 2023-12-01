const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');

// Create a new student with validation
router.post(
  '/students',
  [
    body('name').notEmpty().isString(),
    body('grade').notEmpty().isIn(['A', 'B', 'C', 'D', 'F']),
    // Add other validations for properties as needed
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // If validation succeeds, continue with creating a new student
    try {
      const { name, grade } = req.body;
      const newStudent = new Student({ name, grade });
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (err) {
      res.status(500).json({ error: 'Could not create the student' });
    }
  }
);

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve students' });
  }
});

// Get a specific student by ID
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve the student' });
  }
});

// Update a student by ID
router.put(
  '/students/:id',
  [
    body('name').optional().notEmpty().isString(),
    body('grade').optional().notEmpty().isIn(['A', 'B', 'C', 'D', 'F']),
    // Add other validations for properties as needed
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(updatedStudent);
    } catch (err) {
      res.status(500).json({ error: 'Could not update the student' });
    }
  }
);

// Delete a student by ID
router.delete('/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete the student' });
  }
});

module.exports = router;
