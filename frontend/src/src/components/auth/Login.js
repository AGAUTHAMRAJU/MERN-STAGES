import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState();
  // const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', formData)
      .then(response => {
        console.log(response.data); // Just for demonstration
        const { success, message } = response.data;
        if (success) {
          handleLogin(); // Call handleLogin function from App component
          // history.push('/ch'); // Redirect to Channels page
        } else {
          setError(message);
        }
      })
      .catch(error => {
        console.error('Error sending Login Message:', error);
        setError('An unexpected error occurred, please try again later.');
      });
  };

  return (
    <div className='parent'>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
