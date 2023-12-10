const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3005;
const authRoutes = require('./routes/authRoutes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://anvirtiwana13:NawlMia123@cluster0.kvtku1u.mongodb.net/";
const dbName = 'studentData';
const collectionName = 'students';
app.use(express.urlencoded({ extended: true }));


// Use the authRoutes
app.use('/auth', authRoutes); 

// Express session middleware
app.use(session({
    secret: 'secret-key', // Change this to a more secure secret
    resave: false,
    saveUninitialized: false,
  }));

// Passport initialization and session setup
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy setup
passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
  
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
  
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (!passwordMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
  
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));
  
// Serialize and deserialize user (to store in session)
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

// Registration Route
app.use('/auth', authRoutes); 

// Login Route
app.post('/login', passport.authenticate('local'), (req, res) => {
    // If authentication succeeds, this function will be called.
    // Handle the successful login response here.
    res.json({ message: 'Login successful', user: req.user });
});

// Logout Route
app.get('/logout', (req, res) => {
    req.logout(); // Provided by Passport.js to terminate a login session
    res.json({ message: 'Logout successful' });
});

let collection; // Declaring the collection variable in the outer scope


(async function () {
  try {
      const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
      console.log('Connected to MongoDB.');

      const db = client.db(dbName);
      collection = db.collection(collectionName); // Assign the collection here

  } catch (err) {
      console.error('Error occurred while connecting to MongoDB:', err);
  }
})();


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Importing route files
const courseRoutes = require('./routes/courseRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Use route files
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
          <button onclick="redirectToLogin()"> Login </button>
          <button onclick="redirectToRegister()"> Register </button>
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
            function redirectToLogin(){
              window.location.href = '/auth/login';
            }
            function redirectToRegister() {
              window.location.href = '/auth/register';
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
// The '/api/students' POST endpoint to add a new student
v1Router.post('/api/students', async (req, res) => {
  const { name, grade } = req.body;
  if (name && grade) {
      const newStudent = { name, grade };
      await collection.insertOne(newStudent);
      res.json({ message: 'Student added successfully', student: newStudent });
  } else {
      res.status(400).json({ error:  'Name, grade and course are required.' });
  }
});


app.use('/v1', v1Router);

const server = app.listen(port, () => {
    const serverAddress = server.address();
    const link = `http://localhost:${serverAddress.port}`;
    console.log(`Server is running at ${link}`);
  });