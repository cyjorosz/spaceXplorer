import React, { useEffect, useState } from 'react';
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState();

  const fetchShipsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(SHIPS_API);
      setLoading(false);
      setShips(response.data);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchShipsData();
  }, []);

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'type', label: 'Type' },
    { id: 'active', label: 'Active' },
    { id: 'year_built', label: 'Year Built' },
    { id: 'home_port', label: 'Home Port' },
    { id: 'details', label: 'Details' },
  ];

  const viewShipDetails = (ship) => {
    setSelectedShip(ship);
    console.log('selected ship', selectedShip);
  };

  return (
    <>
      <div>
        <h1>Header Component</h1>
        <Link to="/login">Log out</Link>
      </div>
      <div>
        <h2>Table with data from space X API</h2>
        <table>
          <tbody>
            <tr>
              {columns.map((column) => {
                return <th key={column.id}>{column.label}</th>;
              })}
            </tr>

            {ships &&
              ships.map((ship) => {
                return (
                  <tr key={ship.id}>
                    <td>{ship.name}</td>
                    <td>{ship.type}</td>
                    <td>{ship.active === true ? 'Yes' : 'No'}</td>
                    <td>{ship.year_built}</td>
                    <td>{ship.home_port}</td>
                    <td onClick={() => viewShipDetails(ship)}>view</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Ships;
