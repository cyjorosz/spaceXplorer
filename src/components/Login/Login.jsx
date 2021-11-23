import React, { useState } from 'react';
import axios from 'axios';
import { saveTokenToSessionStorage, saveTokenToLocalStorage } from '../../helpers/token';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const LOGIN_ENDPOINT = 'http://localhost:8080/login';

  const loginUser = async (credentials) => {
    setError('');
    return axios.post(LOGIN_ENDPOINT, credentials).then((data) => {
      let response = data.data;
      if (response.success) {
        rememberMe
          ? saveTokenToLocalStorage(response.token)
          : saveTokenToSessionStorage(response.token);
        window.location.href = '/ships';
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
    await loginUser(credentials);
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <>
      <h1>Log in</h1>
      <div>{error && error}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <label>Password</label>
        <input type="checkbox" value={rememberMe} onChange={handleRememberMe} />
        <label>Remember me</label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
