const express = require('express');
const router = express.Router();
const Course = require('../models/Course'); // Import the Course model

// Create a new course
router.post('/courses', async (req, res) => {
  try {
    const { courseName, instructor, description } = req.body;
    const newCourse = new Course({ courseName, instructor, description });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: 'Could not create the course' });
  }
});

// Define the isAuthenticated middleware function
const isAuthenticated = (req, rs, next) => {
  // Check if the user is authenticated (you can implement this based on your authentication logic)
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, continue to the next middleware/route handler
  }
  // If not authenticated, redirect or send an error response
  res.status(401).json({ error: 'Unauthorized' });
};

// Get all courses
router.get('/courses', isAuthenticated, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve courses' });
  }
});

// Get a specific course by ID
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve the course' });
  }
});

// Update a course by ID
router.put('/courses/:id', async (req, res) => {
  try {
    const { courseName, instructor, description } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { courseName, instructor, description }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: 'Could not update the course' });
  }
});

// Delete a course by ID
router.delete('/courses/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete the course' });
  }
});

module.exports = router;
