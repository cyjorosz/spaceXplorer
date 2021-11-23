import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const LOGIN_ENDPOINT = 'http://localhost:8080/login';

  const loginUser = async (credentials, setToken) => {
    setError('');
    // console.log('credentials 2', JSON.stringify(credentials));
    return axios.post(LOGIN_ENDPOINT, credentials).then((data) => {
      let response = data.data;
      console.log(JSON.stringify(response));
      if (response.success) {
        // let rememberMe = false;
        // if (rememberMe) {
        //   // TODO persist token in local storage
        // }
        // console.log('Token is ' + response.token);
        setToken(response.token);
        navigate('/ships');
      } else {
        setError(response.errorMessage);
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      username: email,
      password: password,
    };
    // console.log('credentials 1', JSON.stringify(credentials));
    await loginUser(credentials, setToken);
  };

  return (
    <>
      <h1>Log in</h1>
      <div>{error && error}</div>
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
        {/* <label>Password</label>
        <input type="checkbox" />
        <label>Remember me</label> */}
        {/* <Link to="/ships">Ships</Link> */}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
