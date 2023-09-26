const express = require('express');
const app = express();
const port = 4000;

// Sample student data
const students = [
  { id: 1, name: 'Mia', grade: 'B' },
  { id: 2, name: 'Khia', grade: 'B' },
  { id: 3, name: 'Remy', grade: 'C' },
  { id: 4, name: 'Nicki', grade: 'A' },
  { id: 5, name: 'Emily', grade: 'B' },
  { id: 6, name: 'Lizz', grade: 'D' },
  { id: 7, name: 'Sam', grade: 'C' },
  // Add more sample students as needed
];

app.use(express.json());

// Version 1 of the API
app.get('/api/v1/students', (req, res) => {
  try {
    let filteredStudents = [...students];

    // Filtering by grade
    const gradeFilter = req.query.grade;
    if (gradeFilter) {
      filteredStudents = filteredStudents.filter(student => student.grade === gradeFilter);
    }

    // Sorting by name
    const sortField = req.query.sort;
    if (sortField === 'name') {
      filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortField === 'grade') {
      filteredStudents.sort((a, b) => a.grade.localeCompare(b.grade));
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

    // Checks if the requested page is out of range
    if (page < 1 || startIndex >= filteredStudents.length) {
      throw new Error('Page not found');
    }

    res.json(paginatedStudents);
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
});

// Get the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname));


// Default route for handling the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Student API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
