# SpaceXplorer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run the app

### Dependencies

- Node: v16.13.0
- [yarn package manager](https://yarnpkg.com/)

Install project dependencies:

`yarn install`

To run in development mode:

`yarn start`

Open [http://localhost:3000](http://localhost:3000) to view the site.

For the login functionality to work, you need to run a node server

`node server.js`

## Dependencies

Routing [React Router](https://reactrouter.com/)
CSS in JS [Styled Components](https://styled-components.com/)
State is managed using [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Outstanding Improvements

- Split components up, the Ships file is too bloated, needs to move Table component
- Move some of the functions like for sorting into helpers
- Add tests that validate the correct behaviour
- Add additional styling and also style based on props such as adding background color to the row which is selected when the user clicks 'View'
- Extend style theme to include preset media queries
- Investigate whether it makes sense to look at other hooks for managing state (useReducer)
- Replace window.location - refactor this to use React Router navigation
