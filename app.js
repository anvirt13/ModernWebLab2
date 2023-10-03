const express = require('express');
const app = express();
const port = 4000;

const EventEmitter = require('events');
const customEmitter = new EventEmitter();

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

// Helper function to filter students
async function filterStudents(query) {
  try {
    let filteredStudents = [...students];

    if (query.grade) {
      filteredStudents = filteredStudents.filter(student => student.grade === query.grade);
    }

    if (query.sort === 'name') {
      filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
    } else if (query.sort === 'grade') {
      filteredStudents.sort((a, b) => a.grade.localeCompare(b.grade));
    }

    return filteredStudents;
  } catch (error) {
    throw error;
  }
}

// Helper function to paginate students
function paginateStudents(data, page, pageSize) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
}

// Version 1 of the API
app.get('/api/v1/students', async (req, res, next) => {
  try {
    const query = {
      grade: req.query.grade,
      sort: req.query.sort,
    };

    const filteredStudents = await filterStudents(query);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const paginatedStudents = paginateStudents(filteredStudents, page, pageSize);

    if (page < 1 || paginatedStudents.length === 0) {
      const error = new Error('Page not found');
      error.statusCode = 404;
      throw error;
    }

    res.json(paginatedStudents);
  } catch (error) {
    next(error); // Pass the error to Express's error handling middleware
  }
});

// Custom event example
app.get('/custom-event', (req, res, next) => {
  try {
    // Emit a custom event
    customEmitter.emit('customEvent', 'Custom event was triggered');
    res.send('Custom event emitted.');
  } catch (error) {
    next(error);
  }
});

// Listen for the custom event
customEmitter.on('customEvent', (message) => {
  console.log(message);
});

// Get the HTML file
app.get('/', (req, res, next) => {
  try {
    res.sendFile(__dirname + '/index.html');
  } catch (error) {
    next(error);
  }
});
app.use(express.static(__dirname));

// Default route for handling the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Student API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
