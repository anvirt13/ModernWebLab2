const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://anvirtiwana13:NawlMia123@cluster0.kvtku1u.mongodb.net/";
let db;

(async function () {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log('Connected to MongoDB.');
        db = client.db("studentData");

    } catch (err) {
        console.error('Error occurred while connecting to MongoDB:', err);
    }
})();

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
    const { name, grade } = req.body;
    if (name && grade) {
        const newStudent = { name, grade };

        // Add the student to MongoDB
        const collection = db.collection('students');
        await collection.insertOne(newStudent);

        res.redirect('/addStudent');
    } else {
        res.send('Both name and grade are required.');
    }
});

// API Version 1
const v1Router = express.Router();

// API endpoint for students
v1Router.get('/api/students', async (req, res) => {
    const collection = db.collection('students');

    try {
        const allStudents = await collection.find().toArray();

        // Sort students by name and grade
        const sortedStudents = allStudents.sort((a, b) => {
            // Sort by name first
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;

            // If names are equal, sort by grade
            if (a.grade < b.grade) return -1;
            if (a.grade > b.grade) return 1;
            return 0;
        });

        res.json(sortedStudents);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve students from the database.' });
    }
});


// Add a new student to the database
v1Router.post('/api/students', async (req, res) => {
    const { name, grade } = req.body;
    if (name && grade) {
        const newStudent = { name, grade };

        // Add the student to MongoDB
        const collection = db.collection('students');
        await collection.insertOne(newStudent);

        res.json({ message: 'Student added successfully', student: newStudent });
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