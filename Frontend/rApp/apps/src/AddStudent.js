import React, { useState } from 'react';

const AddStudentForm = ({ username }) => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [grade, setGrade] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3005/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, course, grade, postedBy: username }), // Include 'postedBy' information
      });

      if (response.ok) {
        console.log('Student added successfully!');
        setName('');
        setCourse('');
        setGrade('');
        // Add any additional logic upon successful student addition if needed
      } else {
        console.error('Failed to add student');
        // Handle failure scenario here
      }
    } catch (error) {
      console.error('Error adding student:', error);
      // Handle error scenario here
    }
  };

  return (
    <div className="app-container">
      <h2>Add Student</h2>
      <form onSubmit={handleAddStudent}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Course:
          <input type="text" value={course} onChange={handleCourseChange} />
        </label>
        <br />
        <label>
          Grade:
          <input type="text" value={grade} onChange={handleGradeChange} />
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
