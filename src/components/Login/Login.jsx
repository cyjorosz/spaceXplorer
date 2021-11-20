import React from 'react';

// TO DO:
// Login page should have 2 textbox input fields, 1 checkbox input field and 1 button.

// Textbox input fields are:

// - Email (it should have input validation for email format 'xzy@test.com')
// - Password (should be masked)

// Checkbox input field:
// - Remember me (if selected, authentication should be persisted in local storage)

// Button:
// - Log in button

// The task here is to create 'fake' login page which checks input for email 'email@test.com' and password 'test123'.
// - If different credentials are entered, the page should display an error message.
// - If correct credentials are entered, the app should be routed to /ships page.
// - If 'remember me' checkbox is checked, successful login should be persisted into the local storage (it can be a simple flag: authenticated: true/false), which means, when the app is reloaded from /ships page, the app should land on the /ships page again.
// - If 'remember me' is not checked, successful login should not be persisted into the local storage, which means, when app is reloaded from /ships page, the app should land on the /login page.

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <form action="submit">
        <input type="text" placeholder="email" required />
        <label>Email</label>
        <input type="password" placeholder="password" required />
        <label>Password</label>
        <input type="checkbox" />
        <label>Remember me</label>
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
