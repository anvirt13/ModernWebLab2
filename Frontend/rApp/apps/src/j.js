Now the front end:

Frontend/src/Login/LoginForm.js:
import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3005/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // If login is successful, show an alert
        alert('Login successful!'); // Replace with your preferred notification logic
      } else {
        // If login fails, handle the error
        const errorMessage = await response.json();
        setError(errorMessage.message); // Assuming the error message is in the 'message' field
      }
    } catch (error) {
      // Handle network errors or other issues
      setError('An error occurred. Please try again later.');
      console.error(error); // Log the error for debugging purposes
    }
  };

  return (
    <div className="app-section">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button className="app-button" type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

Frontend/src/Login/RegisterForm.js:
import React, { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3005/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response:', response);

      if (response.ok) {
        setSuccessMessage('Registration successful!');
        setUsername('');
        setPassword('');
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || 'Registration failed');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="app-section">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button className="app-button" type="submit">
          Register
        </button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;

Frontend/src/App.js:import React, { useState, useEffect, Component } from 'react';
import CrudApp from './crudApp.js';
import './stylesheet.css';
import LoginForm from './Login/LoginForm.js';
import RegisterForm from './Login/RegisterForm.js';


// Functional component using hooks
function App() {
  const [students, setStudents] = useState([]);
  const [sortByName, setSortByName] = useState(false);
  const [sortByGrade, setSortByGrade] = useState(false);

  const toggleSortByName = () => {
    setSortByName(!sortByName);
    setSortByGrade(false);
  };

  const toggleSortByGrade = () => {
    setSortByName(false);
    setSortByGrade(!sortByGrade);
  };

  // Regular expression for matching A, B, C, D, or F

  useEffect(() => {
    async function fetchStudentData() {
      try {
        // Update the URL as needed
        const response = await fetch('http://localhost:3005/v1/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }

    fetchStudentData();
  }, []);



  const sortedStudents = [...students];

  if (sortByName) {
    sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortByGrade) {
    sortedStudents.sort((a, b) => {
      // Assuming grades are in the order A > B > C > D > F
      const gradeOrder = { A: 0, B: 1, C: 2, D: 3, F: 4 };
      return gradeOrder[a.grade] - gradeOrder[b.grade];
    });
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Student Grade Data</h1>

    <div className="app-container">
      <LoginForm />
      <hr />
      <RegisterForm />
    </div>

      <div className="app-section">
        <h2>Student Data</h2>
        <button className="app-button" onClick={toggleSortByName}>
          Show Students by Name
        </button>
        <button className="app-button" onClick={toggleSortByGrade}>
          Show Students by Grade
        </button>
        <StudentList students={sortedStudents} sortByName={sortByName} sortByGrade={sortByGrade} />
      </div>

      <div className="app-section">
        <CrudApp />
      </div>
    </div>
  );
}

// Class component for rendering students with conditional sorting
class StudentList extends Component {
  render() {
    const { students, sortByName, sortByGrade } = this.props;
    const sortedStudents = [...students];

    if (sortByName) {
      sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortByGrade) {
      const gradeOrder = { A: 0, B: 1, C: 2, D: 3, F: 4 };
      sortedStudents.sort((a, b) => gradeOrder[a.grade] - gradeOrder[b.grade]);
    }

    return (
      <ul className="app-file-list">
        {sortedStudents.map((student) => (
          <li key={student.id}>
            <strong>{student.name}</strong> | Course: {student.course} | Grade: {student.grade}
          </li>
        ))}
      </ul>
    );
  }
}

export default App;

Frontend/src/crudApp.js:
import React, { useRef } from 'react';
import { useTextFileManagement } from './useTextFileManagement'; // Import the custom hook

function CrudApp() {
  const {
    files,
    selectedFile,
    fileContent,
    editedText,
    isEditing,
    handleFileChange,
    createFile,
    selectFile,
    editFile,
    saveFile,
    deleteFile,
    newFileName,
    setNewFileName,
    setEditedText,
  } = useTextFileManagement(); // Custom hook

  const fileInputRef = useRef();

  return (
    <div>
      <h1>CRUD System for Text Files</h1>
      <input type="file" accept=".txt" ref={fileInputRef} onChange={() => handleFileChange(fileInputRef)} />

      <h2>Create New File:</h2>
      <div>
        <input
          type="text"
          placeholder="Enter file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
        <button className="app-button" onClick={createFile}>Create</button>
      </div>

      <div>
        <h2>Selected File: {selectedFile ? selectedFile.name : 'No File Selected'}</h2>
        {isEditing ? (
          <div>
            <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
            <button className="app-button" onClick={saveFile}>Save</button>
          </div>
        ) : (
          <div>
            <div>Content:</div>
            <pre>{fileContent}</pre>
            <button className="app-button" onClick={editFile}>Edit</button>
            <button className="app-button" onClick={deleteFile}>Delete</button>
          </div>
        )}
      </div>

      <h2>All Files:</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => selectFile(file)}>
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrudApp;


useTextFileManagement.js:
import { useState } from 'react';

export function useTextFileManagement() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState(''); // Define setNewFileName

  const handleFileChange = (fileInputRef) => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;
        setFileContent(content);
      };

      reader.readAsText(file);
    }
  };

  const createFile = () => {
    if (newFileName) {
      const newFile = {
        name: newFileName + '.txt',
        content: '',
      };
      setFiles([...files, newFile]);
      setNewFileName(''); // Reset newFileName
    }
  };

  const selectFile = (file) => {
    setSelectedFile(file);
    setFileContent(file.content);
    setIsEditing(false);
  };

  const editFile = () => {
    setIsEditing(true);
  };

  const saveFile = () => {
    const updatedFiles = files.map((file) => {
      if (file === selectedFile) {
        return { ...file, content: editedText };
      }
      return file;
    });
    setFiles(updatedFiles);
    setIsEditing(false);
  };

  const deleteFile = () => {
    const updatedFiles = files.filter((file) => file !== selectedFile);
    setSelectedFile(null);
    setFiles(updatedFiles);
  };

  return {
    files,
    selectedFile,
    fileContent,
    editedText,
    setEditedText,
    isEditing,
    newFileName,
    setNewFileName,
    handleFileChange,
    createFile,
    selectFile,
    editFile,
    saveFile,
    deleteFile,
  };
}