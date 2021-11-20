import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

// TO DO
// - Header:
//   - Displays title, description (copied from docs).
//   - Log out button (routes to login page and removes authentication flag from local storage if it's persisted).

// - Left - Table:

//   - Displays response from the API request https://api.spacexdata.com/v4/ships.
//   - It should display columns: name, type, active, year built, home port and details column, that contains 'view' button for each record, which functionality will be described below.
//   - The table should be server-side paginated with 10 results by page. Pagination controls should contain buttons for previous/next page and total number of pages.
//   - Table should be servier-side sortable by all displayed columns.

// - Right - Details view:
//   - Displays details about the selected ship from the table, by clicking 'view' button from the details column.
//   - It should contain ship's name, year built, roles and image if it's available. If an image is not available, the placeholder image should be rendered.
//   - Displays 'launches' list that contains urls to wikipeadia articles about the launches ship was apart of

const Ships = () => {
  const SHIPS_API = `https://api.spacexdata.com/v4/ships`;

  const fetchShipsData = async () => {
    try {
      const response = await axios.get(SHIPS_API);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  fetchShipsData();

  return (
    <>
      <div>
        <h1>Header Component</h1>
        <Link to="/login">Log out</Link>
      </div>
      <div>Table with data from space X</div>
    </>
  );
};

export default Ships;
