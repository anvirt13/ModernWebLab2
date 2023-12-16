## Project Overview: Student Data Management System
This repository combines the frontend and backend components for a comprehensive student data management system. Below, you'll find details about both the frontend and backend structures, functionalities, and setup instructions.

## Frontend Codebase Overview
The frontend repository houses components responsible for handling student data, user authentication, file management, and CRUD operations.

## Components
Login and Registration
LoginForm.js: Manages user login functionality.
RegisterForm.js: Handles user registration.
App and Student Data
App.js: Main component orchestrating data retrieval and display.
StudentList: Component to render student data with sorting options.
CRUD Operations
crudApp.js: Provides a CRUD system for text files, enabling file creation, editing, deletion, and display.
Text File Management
useTextFileManagement.js: Custom hook handling text file operations.
Usage


# Installation
To run the frontend:
Clone this repository.
Navigate to the frontend directory.
Run npm install to install dependencies.
Run npm start to start the development server.
Important Notes
Ensure proper backend API endpoints 
(http://localhost:3005/auth/login, 
http://localhost:3005/auth/register,
http://localhost:3005/v1/api/students) are available and correctly configured.
Backend connectivity is necessary for the app to function correctly.

## Folder Structure
# The frontend directory structure is organized as follows:
src/
    Login/: Contains login and registration components.
    crudApp.js: Manages CRUD operations for text files.
    useTextFileManagement.js: Custom hook for text file management.
    App.js: Main component orchestrating data and rendering.
Backend Overview
The backend repository serves as an API for managing student data, courses, grades, and user authentication. It's built using Node.js with Express.js as the framework and MongoDB as the database.

# Installation

To set up the backend locally:
- Clone this repository.
- Run npm install to install dependencies.
- Ensure MongoDB is installed and running.
- Set up a .env file with required environment variables (if any).

# Project Structure

## The backend consists of various components handling different functionalities:

# File Operations
    fileOperations.js: Core logic and configurations for the backend application.
    Models
    Course.js: Defines the schema for the Course model.
    Grade.js: Defines the schema for the Grade model.
    Student.js: Defines the schema for the Student model.
    User.js: Defines the schema for the User model and handles user authentication.
    Routes
    authRoutes.js: Manages user authentication, registration, login, and logout.
    courseRoutes.js: Handles CRUD operations for courses.
    gradeRoutes.js: Handles CRUD operations for grades.
    studentRoutes.js: Handles CRUD operations for students.

# Modifications for Mini-Project 10:

    - Added HTTPs
    - JwtAuth token
    - server keys


# Usage
     The backend offers various API endpoints for different operations related to users, students, courses, and grades.

# Running the Server
     Run npm start to start the server.
     The server will run on http://localhost:3005 