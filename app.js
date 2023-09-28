const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

// Sample student data
const students = [
  { id: 1, name: 'Mia' },
  { id: 2, name: 'Khia' },
  { id: 3, name: 'Remy' },
];

// Sample user data
let users = [
  { id: 1, name: 'Anvir' },
  { id: 2, name: 'Krystal' },
  { id: 3, name: 'Nicole' },
];

// Endpoint to retrieve all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Endpoint to retrieve a specific student by ID
app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
});

// Endpoint to create a new student
app.post('/api/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Endpoint to update a student by ID
app.put('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const updatedStudent = req.body;
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  students[index] = updatedStudent;
  res.json(updatedStudent);
});

// Endpoint to delete a student by ID
app.delete('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  students.splice(index, 1);
  res.status(204).send();
});

// Endpoint to retrieve all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Endpoint to retrieve a specific user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// Endpoint to create a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint to update a user by ID
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[index] = updatedUser;
  res.json(updatedUser);
});

// Endpoint to delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send();
});

// Default route for handling the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Student and User API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
