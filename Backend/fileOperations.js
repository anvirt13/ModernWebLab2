const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://anvirtiwana13:NawlMia123@cluster0.kvtku1u.mongodb.net/studentData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB.');
});

const Course = require('./models/Course');
const Grade = require('./models/Grade');
const Student = require('./models/Student');

const courseRoutes = require('./routes/courseRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const studentRoutes = require('./routes/studentRoutes');

app.use('/api', courseRoutes);
app.use('/api', gradeRoutes);
app.use('/api', studentRoutes);


// Main page with buttons
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Student Data Page</title>
        </head>
        <body>
          <h1> Student API </h1>
          <button onclick="redirectToApiStudents()">Fetch Student Data as JSON</button>
          <button onclick="redirectToStudentsPage()">Add Student</button>
          <pre id="jsonResult"></pre>
          <script>
            function redirectToApiStudents() {
              window.location.href = '/v1/api/students';
            }
            function redirectToStudentsPage() {
              window.location.href = '/addStudent';
            }
          </script>
        </body>
        </html>
    `);
});

// Add Student Page
app.get('/addStudent', (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Add Student</title>
      </head>
      <body>
          <h1>Add Student</h1>
          <form action="/addStudent" method="post">
              <label for="name">Name:</label>
              <input type="text" name="name" id="name" required><br><br>
              <label for="grade">Grade:</label>
              <input type="text" name="grade" id="grade" required><br><br>
              <label for="course">Course:</label>
              <input type="text" name="course" id="course" required><br><br>
              <input type="submit" value="Add Student">
              <button type="button" onclick="redirectToMainPage()">Back</button>
          </form>
          <script>
              function redirectToMainPage() {
                  window.location.href = '/';
              }
          </script>
      </body>
      </html>
  `);
});

// Handle Add Student Form Submission
app.post('/addStudent', async (req, res) => {
  const { name, grade, course } = req.body;
  if (name && grade && course) {
      const newStudent = { name, grade, course };

      // Add the student to MongoDB
      const collection = db.collection('students');
      await collection.insertOne(newStudent);

      res.redirect('/addStudent');
  } else {
      res.send('Name, grade, and course are required.');
  }
});

// API Version 1
const v1Router = express.Router();

// API endpoint for students
v1Router.get('/api/students', async (req, res) => {
    try {
      const allStudents = await Student.find().sort({ name: 1, grade: 1 }).exec();
      res.json(allStudents);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve students from the database.' });
    }
  });


// Add a new student to the database
v1Router.post('/api/students', async (req, res) => {
    const { name, grade } = req.body;
    if (name && grade) {
      try {
        const newStudent = new Student({ name, grade });
        await newStudent.save();
        res.json({ message: 'Student added successfully', student: newStudent });
      } catch (err) {
        res.status(500).json({ error: 'Could not add the student to the database.' });
      }
    } else {
      res.status(400).json({ error: 'Both name and grade are required.' });
    }
  });
  
  app.use('/v1', v1Router);

  const server = app.listen(port, () => {
    const serverAddress = server.address();
    const link = `http://localhost:${serverAddress.port}`;
    console.log(`Server is running at ${link}`);
  });