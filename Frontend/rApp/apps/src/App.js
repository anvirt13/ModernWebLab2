import React, { useState, useEffect, Component } from 'react';
import CrudApp from './crudApp.js';
import './stylesheet.css';

// Functional component using hooks
function App() {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('');
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
  const gradePattern = /^[ABCDF]$/;

  useEffect(() => {
    async function fetchStudentData() {
      try {
        // Update the URL as needed
        const response = await fetch('https://backendminiproject7.onrender.com/v1/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }

    fetchStudentData();
  }, []);

  const handleAddStudent = () => {
    if (!newStudentName || !gradePattern.test(newStudentGrade)) {
      alert('Please enter both a name and a valid grade (A, B, C, D, or F).');
      return;
    }

    const newStudent = {
      id: students.length + 1,
      name: newStudentName,
      grade: newStudentGrade,
    };

    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setNewStudentName('');
    setNewStudentGrade('');
  };

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

      <div className="app-section">
        <h2>Add Student</h2>
        <input
          type="text"
          name="newStudentName"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          placeholder="Enter student name"
        />
        <input
          type="text"
          name="newStudentGrade"
          value={newStudentGrade}
          onChange={(e) => setNewStudentGrade(e.target.value.toUpperCase())}
          placeholder="Enter student grade"
        />
        <button className="app-button" onClick={handleAddStudent}>
          Add Student
        </button>
      </div>

      <div className="app-section">
        <h2>Sort Students</h2>
        <button className="app-button" onClick={toggleSortByName}>
          Show Students by Name
        </button>
        <button className="app-button" onClick={toggleSortByGrade}>
          Show Students by Grade
        </button>
      </div>

      <div className="app-section">
        <h2>Student Data</h2>
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
            <strong>{student.name}</strong> | current grade is {student.grade}
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
