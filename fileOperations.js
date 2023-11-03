const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample student data
const students = [
  { id: 1, name: 'Mia', grade: 'B' },
  { id: 2, name: 'Khia', grade: 'B' },
  { id: 3, name: 'Remy', grade: 'C' },
  { id: 4, name: 'Nicki', grade: 'C' },
  { id: 5, name: 'Emily', grade: 'B' },
  { id: 6, name: 'Lizz', grade: 'D' },
  { id: 7, name: 'Sam', grade: 'C' },
  { id: 8, name: 'Alex', grade: 'F'},
  { id: 9, name: 'Zion', grade:'A'}

];

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});


// Main page with buttons
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Student Data Page</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
      <button onclick="redirectToApiStudents()">Fetch Student Data as
JSON</button>
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

// Directory to store text files
const fileDirectory = path.join(__dirname, 'textFiles');
if (!fs.existsSync(fileDirectory)) {
  fs.mkdirSync(fileDirectory);
}

// Serve text files
app.get('/textFiles/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(fileDirectory, fileName);

  try {
    const data = await fs.readFile(filePath, 'utf8'); // Use await with fs.readFile
    res.send(data);
  } catch (error) {
    res.status(404).send('File not found');
  }
});

app.post('/textFiles/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(fileDirectory, fileName);

  const content = req.body.content;

  try {
    await fs.writeFile(filePath, content); // Use await with fs.writeFile
    res.send('File updated successfully.');
  } catch (error) {
    res.status(500).send('Error writing the file.');
  }
});

app.delete('/textFiles/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(fileDirectory, fileName);

  try {
    await fs.unlink(filePath); // Use await with fs.unlink
    res.send('File deleted successfully.');
  } catch (error) {
    res.status(500).send('Error deleting the file.');
  }
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
app.post('/addStudent', (req, res) => {
  const { name, grade } = req.body;
  if (name && grade) {
    const newStudent = { id: students.length + 1, name, grade };
    students.push(newStudent);
    res.redirect('/addStudent');
  } else {
    res.send('Both name and grade are required.');
  }
});

// API Version 1
const v1Router = express.Router();

// Simulate asynchronous behavior with setTimeout
const simulateAsyncOperation = (callback) => {
  setTimeout(callback, 1000); // Simulate a 1-second delay
};

// API endpoint for students (renamed to /api/students)
v1Router.get('/api/students', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // Calculate the starting index and ending index based on pagination parameters
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  // Get a subset of students based on pagination
  const studentsSubset = students.slice(startIndex, endIndex);

  // If a grade query parameter is provided, filter students by grade
  const { grade } = req.query;
  if (grade) {
    const filteredStudents = studentsSubset.filter((student) => student.grade === grade);
    res.json(filteredStudents);
  } else {
    // If no filter is applied, return the paginated students
    simulateAsyncOperation(() => {
      res.json(studentsSubset);
    });
  }
});

// Add a new student to the students array
v1Router.post('/api/students', async (req, res) => {
  const { name, grade } = req.body;
  if (name && grade) {
    // Simulate an asynchronous operation, e.g., a database insertion
    simulateAsyncOperation(() => {
      const newStudent = { id: students.length + 1, name, grade };
      students.push(newStudent);
      res.json({ message: 'Student added successfully', student: newStudent });
    });
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