const fs = require('fs');
 

let users = [
    { id: 1, name: 'Anvir' },
    { id: 2, name: 'Krystal' },
    { id: 3, name: 'Nicole' },
  ];
  
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
  
  
  
