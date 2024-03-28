import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/HOme.js'; // Corrected typo in import
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';  
import Logout from './components/auth/Logout.js';
import PasswordReset from './components/auth/PasswordReset.js';
import Container from './components/Channels/Container.js';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const handleLogin = async () => {
    try {
      // Make a POST request to your backend login route with user credentials
      const response = await fetch('http://localhost:3001/login', { // Adjust URL accordingly
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      });
  
      if (response.ok) {
        // Login successful, update isLoggedIn state
        setIsLoggedIn(true);
      } else {
        // Handle login failure, display error message or perform necessary actions
        console.error('Login failed:', response.statusText);
        // Example: Set error state to display error message to the user
        // setError('Login failed, please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle any unexpected errors, display error message or perform necessary actions
      // Example: Set error state to display a generic error message to the user
      // setError('An unexpected error occurred, please try again later.');
    }
  };
  

  return (
    <Router>
      <div className="App">
        <div id='title'>
          <span>
            <strong>SLACK4E</strong>
          </span>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              {!isLoggedIn ? (
                <Link to="/login">Sign In</Link>
              ) : (
                <Link to="/logout">Logout</Link>
              )}
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/ch">Channels</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* Pass handleLogin function as a prop to the Login component */}
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}
        />
        <Route path="/ch" element={<Container />} />
        <Route path="/forgot-password" element={<PasswordReset />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
