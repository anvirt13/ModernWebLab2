import React, { useState, useEffect, Component } from 'react';
import CrudApp from './crudApp.js';
import './stylesheet.css';
import LoginForm from './Login/LoginForm.js';
import RegisterForm from './Login/RegisterForm.js';
import AddStudentForm from './AddStudent.js';


// Functional component using hooks
function App() {
  const [students, setStudents] = useState([]);
  const [sortByName, setSortByName] = useState(false);
  const [sortByGrade, setSortByGrade] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

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

  // Function to handle successful login
  const handleSuccessfulLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Student Grade Data</h1>

      <div className="app-container">
        {loggedIn ? (
          <div>
            <h3 className='app-subtitle'>Welcome, {username}!            
             <button className="app-button" onClick={handleLogout}>
              Logout
            </button></h3>

            <div className="app-container">
            <AddStudentForm username={username} />

            </div>
          </div>
        ) : (
          <div>
            <LoginForm handleSuccessfulLogin={handleSuccessfulLogin} />
            <hr />
            <RegisterForm />
          </div>
        )}
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
            <strong>{student.name}</strong> | Course: {student.course} | Grade: {student.grade} | Posted By: {student.postedBy}
          </li>
        ))}
      </ul>
    );
  }
}


export default App;