const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade'); // Import the Grade model

// Create a new grade
router.post('/grades', async (req, res) => {
  try {
    const { gradeLetter } = req.body;
    const newGrade = new Grade({ gradeLetter });
    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (err) {
    res.status(500).json({ error: 'Could not create the grade' });
  }
});






// Get all grades
router.get('/grades', async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve grades' });
  }
});

// Get a specific grade by ID
router.get('/grades/:id', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json(grade);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve the grade' });
  }
});

// Update a grade by ID
router.put('/grades/:id', async (req, res) => {
  try {
    const { gradeLetter } = req.body;
    const updatedGrade = await Grade.findByIdAndUpdate(req.params.id, { gradeLetter }, { new: true });
    if (!updatedGrade) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json(updatedGrade);
  } catch (err) {
    res.status(500).json({ error: 'Could not update the grade' });
  }
});

// Delete a grade by ID
router.delete('/grades/:id', async (req, res) => {
  try {
    const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
    if (!deletedGrade) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json({ message: 'Grade deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete the grade' });
  }
});

module.exports = router;
