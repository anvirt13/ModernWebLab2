import React, { useState } from 'react';

const LoginForm = ({ handleSuccessfulLogin }) => {
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
        // If login is successful, call the handleSuccessfulLogin function
        handleSuccessfulLogin(username); // Pass the username
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
