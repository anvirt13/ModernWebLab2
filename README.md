Student Data Management System
Overview:
fileOperations.js: Backend server logic using Express.js for handling student data. Connects to MongoDB, manages student records, and provides APIs for fetching and sorting student data.

app.js: Frontend React application managing student data. Enables adding students, sorting by name or grade, and displaying the data.

crudApp.js: Handles CRUD operations for text files using React hooks. Allows creating, editing, saving, and deleting text files.

Usage:
Install Dependencies: npm install
Start Server: node fileOperations.js
Start React App: npm start
Access the app at http://localhost:3000 in the browser.

Features:
Backend (fileOperations.js):

Manages student data using MongoDB.
Provides endpoints for adding, fetching, and sorting students.
Frontend (app.js):

Allows adding new students and sorting data.
Fetches and displays student data.
Text File Management (crudApp.js):

Manages CRUD operations for text files.
Creates, edits, saves, and deletes text files.
Technologies:
Backend: Node.js, Express.js, MongoDB
Frontend: React.js
