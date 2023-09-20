const express = require('express');
const app = express();
const port = 4000;

// Sample student data
const students = [
  { id: 1, name: 'Mia' },
  { id: 2, name: 'Khia' },
  { id: 3, name: 'Remy' },
];

app.use(express.json());

// Endpoint to retrieve all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Default route for handling the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Student API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});