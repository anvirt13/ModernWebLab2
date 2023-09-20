const fs = require('fs');
const path = require('path');
const http = require('http');
const { readFile } = require('fs/promises');
const express = require('express');
const bodyParser = require('body-parser');



let users = [
    { id: 1, name: 'Anvir' },
    { id: 2, name: 'Krystal' },
    { id: 3, name: 'Nicole' },
  ];
  
  //Read a file using node fs
  fs.readFile(path.join(__dirname, 'file.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log("\nFile 1 Contents:");
    console.log(data);
  });

  //Writing in a file using node fs
  const filePath = "fileTwo.txt"
  const contentToWrite = "Goodbye World!"

  fs.writeFile(filePath, contentToWrite,(err) =>{
    if (err){
      console.error("Error writing into the file:", err);
    }else{
      console.log("\nContent has been added to file 2!");
      console.log("\nUpdated Content in File 2:")
      console.log(contentToWrite); // displays the updated content in file 2
    }
  } )

  // Create a server using HTTP Module, displays a page on http://localhost:3000/ that says "Welcome to my website"
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Welcome to my Website")
    res.end();
  }).listen(3000);
  
  // REST APIs, 


  

  // Creating a new user
  function generateUserId() {
    const maxId = Math.max(...users.map((user) => user.id));
    return maxId + 1;
  }
  
  // Function to create a new user
  function createUser(name) {
    try {
      const newUser = {
        id: generateUserId(),
        name,
      };
      users.push(newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating a user:', error);
      return null;
    }
  }
  
  //How to create a new user
  const newUserName = 'Britanny';
  const createdUser = createUser(newUserName);
  
  if (createdUser) {
    console.log(`User ${createdUser.name} with ID ${createdUser.id} has been created.`);
  } else {
    console.log('User creation failed.');
  }
  
  // Delete a user by ID:
  function deleteUserById(userId) {
    try {
      // Find the index of the user with the given ID
      const userIndex = users.findIndex((user) => user.id === userId);
  
      if (userIndex === -1) {
        // There would be no users with this ID
        return false;
      }
  
      // Removing a user from the array
      users.splice(userIndex, 1);
      return true;
    } catch (error) {
      console.error('Error deleting a user:', error);
      return false;
    }
  }
  
  // Deleting a user by ID
  const userIdToDelete = 2;
  const deleted = deleteUserById(userIdToDelete);
  
  if (deleted) {
    console.log(`User with ID ${userIdToDelete} has been deleted.`);
  } else {
    console.log(`User with ID ${userIdToDelete} was not found or deletion failed.`);
  }
  
  // Shows the updated list of users
  console.log('Updated user list:');
  for (const user of users) {
    console.log(`User ID: ${user.id}, Name: ${user.name}`);
  }
  
  
  
  
