import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Login from 'components/Login/Login';
import Ships from 'components/Ships/Ships';

const App = () => {
  return (
    <>
      <h1>Space Xplorer</h1>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/ships" element={<Ships />}/>
        <Route />
      </Routes>
    </>
  );
}

export default App;
