Student Grade Management System 

- Overview
    This project is a React-based Student Grade Management System that allows users to perform CRUD operations on student data, including adding, updating, deleting, and retrieving student information. The system provides a user interface to manage text files and interact with a MongoDB database via an Express backend.

- Components
App Component (App.js)
    Manages the state for student data, new student details, and sorting preferences.
    Fetches student data from a MongoDB database using asynchronous calls.
    Renders buttons to toggle sorting by student name or grade.
    Integrates the StudentList component to display sorted student data.
    Includes a section with the CrudApp component to manage text files.
    
    StudentList Component (App.js)
    Receives student data and sorting preferences as props.
    Sorts and displays the list of students based on name or grade, depending on the selected sorting preference.

    CRUD App Component (crudApp.js)
    Implements a CRUD system for text files.
    Allows users to create, edit, save, delete, and view text files.
    Manages file selection, content editing, and file creation.

    Text File Management Custom Hook (useTextFileManagement.js)
    Provides functionality to manage text files using React hooks.
    Manages file creation, selection, editing, saving, and deletion.

- Backend Functionality
    MongoDB Integration (fileOperations.js)
    Sets up a connection to MongoDB using the MongoClient in Express.
    Defines API endpoints for handling student data operations, such as adding, retrieving, updating, and deleting students.

    Express Routes (studentRoutes.js, gradeRoutes.js, courseRoutes.js)
    Define routes and corresponding handlers for CRUD operations on students, grades, and courses.

    Utilizes MongoDB models (Student, Grade, Course) for interacting with the database.
    
    MongoDB Models (Student.js, Grade.js, Course.js)
    Define schemas and models for Student, Grade, and Course entities using Mongoose for MongoDB interactions.

Running the Project
To run the project locally:

Install dependencies using npm install in both the frontend and backend directories.
Start the backend server using npm start in the backend directory.
Start the React app using npm start in the frontend directory.
Access the application in your web browser at http://localhost:3000.

- Notes
   - Ensure MongoDB is running and accessible for proper integration.
   - Modify MongoDB connection settings in fileOperations.js as needed.
   - Customize validation and error handling in Express routes          according to specific requirements.

