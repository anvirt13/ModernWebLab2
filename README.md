Student Data Project

Features: 
- This program allows you to read and log students and their grades in the database system.

- Users are allowed to sort students by either their first name in alphabetical order, or sort students by their grades from highest (A) to lowest (F).

- The CRUD portion of the app allows you to choose an existing .txt file from your computer and edit it/view it's contents. It also allows you to create a brand new app that you can name and once created, it shows the files in the "All Files" section where you can edit & delete them. 

Code Structure:
- App.js: This is the main React component responsible for managing student data and displaying the user interface. It includes features for adding students and sorting the student list.

- CrudApp.js: A React component that facilitates CRUD (Create, Read, Update, Delete) operations on text files. Users can create, edit, save, and delete text files. This component uses a custom hook called useTextFileManagement to manage file-related operations and state.

- fileOperations.js: This file sets up an Express.js server to serve API endpoints and manage text file operations. It handles routes for serving and managing text files and provides an API for student data. Error handling is also incorporated.

CodeClimate Summary: 
- Maintaiability: B