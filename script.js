document.addEventListener('DOMContentLoaded', () => {
    const showStudentsButton = document.getElementById('showStudentsButton');
    const showByGradeButton = document.getElementById('showByGradeButton');
    const studentList = document.getElementById('studentList');
  
    // Function to display students
    function displayStudents(studentsData) {
      // Clear existing student list
      studentList.innerHTML = '';
  
      // Iterate through the data and display names and grades
      studentsData.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = `${student.name} - Grade: ${student.grade}`;
        studentList.appendChild(listItem);
      });
    }
  
    showStudentsButton.addEventListener('click', () => {
      
      // Make an API request to fetch students' data
      fetch('/api/v1/students')
        .then(response => response.json())
        .then(data => {
          displayStudents(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          alert('An error occurred while fetching data.');
        });
    });
  
  
    showByGradeButton.addEventListener('click', () => {
      // Make an API request to fetch students' data and sort by grade
      fetch('/api/v1/students?sort=grade')
        .then(response => response.json())
        .then(data => {
          data.sort((a, b) => a.grade.localeCompare(b.grade)); // Sort in ascending order (highest grade first)
          displayStudents(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          alert('An error occurred while fetching data.');
        });
    });
  });
  