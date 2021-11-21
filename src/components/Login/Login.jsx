import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// TO DO:
// Textbox input fields are:

// - Email (it should have input validation for email format 'xzy@test.com')
// - Password (should be masked)

// Checkbox input field:
// - Remember me (if selected, authentication should be persisted in local storage)

// The task here is to create 'fake' login page which checks input for email 'email@test.com' and password 'test123'.
// - If different credentials are entered, the page should display an error message.
// - If correct credentials are entered, the app should be routed to /ships page.
// - If 'remember me' checkbox is checked, successful login should be persisted into the local storage (it can be a simple flag: authenticated: true/false), which means, when the app is reloaded from /ships page, the app should land on the /ships page again.
// - If 'remember me' is not checked, successful login should not be persisted into the local storage, which means, when app is reloaded from /ships page, the app should land on the /login page.

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit login');
  };

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Password</label>
        <input type="checkbox" />
        <label>Remember me</label>
        <input type="submit" value="Login" />
        <Link to="/ships">Ships</Link>
      </form>
    </>
  );
};

export default Login;
