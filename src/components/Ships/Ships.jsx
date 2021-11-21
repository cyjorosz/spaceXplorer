import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

// TO DO
// - Header:
//   - Displays title, description (copied from docs).
//   - Log out button (routes to login page and removes authentication flag from local storage if it's persisted).

// - Left - Table:
//   - The table should be server-side paginated with 10 results by page. Pagination controls should contain buttons for previous/next page and total number of pages.

// - Right - Details view:
//   - It should contain ship's name, year built, roles and image if it's available. If an image is not available, the placeholder image should be rendered.
//   - Displays 'launches' list that contains urls to wikipeadia articles about the launches ship was apart of

const Ships = () => {
  const SHIPS_API = `https://api.spacexdata.com/v4/ships`;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState();
  const [sortOrder, setSortOrder] = useState({ orderDirection: 'asc', orderByColumn: 'id' });

  const fetchShipsData = async () => {
    setLoading(true);
    try {
      let response = await axios.get(SHIPS_API);
      setLoading(false);
      setShips(response.data);
      // console.log(response.data);
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

  // Sort the rows that are passed in, in the order defined by the sortOrder
  const sortRows = (rows, sortOrder) => {
    const orderByColumn = sortOrder.orderByColumn;
    // console.log('sorting by ' + orderByColumn);
    const sortedRows = rows.sort((a, b) => {
      let ascendingOrder = a[orderByColumn] > b[orderByColumn] ? 1 : -1;
      if (sortOrder.orderDirection === 'asc') {
        return ascendingOrder;
      } else {
        return ascendingOrder * -1;
      }
    });
    return sortedRows;
  };

  useMemo(() => sortRows(ships, sortOrder), [ships, sortOrder]);

  const handleSort = (orderByColumn) => {
    // console.log('sorting by ' + orderByColumn);
    let orderDirection = 'asc';
    if (sortOrder.orderByColumn === orderByColumn) {
      // If we have sorted on the same column, flip the sorting direction: ;
      orderDirection = sortOrder.orderDirection === 'asc' ? 'desc' : 'asc';
    }
    setSortOrder(() => ({
      orderDirection: orderDirection,
      orderByColumn: orderByColumn,
    }));
  };

  const viewShipDetails = (ship) => {
    setSelectedShip(ship);
  };

  return (
    <>
      <div>
        <h1>Header Component</h1>
        <Link to="/login">Log out</Link>
      </div>
      <div>
        <h2>Table with data from space X API</h2>
        <div>
          {selectedShip && (
            <div style={{ display: 'flex' }}>
              <div style={{ width: '220px' }}>
                <img
                  src={
                    selectedShip.image ? selectedShip.image : 'https://www.fillmurray.com/640/360'
                  }
                  alt="Ship"
                  style={{ maxWidth: '200px', height: '150px' }}
                />
              </div>
              <div style={{ width: 'auto' }}>
                <h2 style={{ marginTop: '0px' }}>{selectedShip.name}</h2>
                <div>
                  {selectedShip.year_built ? <p>Built: {selectedShip.year_built}</p> : null}
                </div>
              </div>
            </div>
          )}
        </div>
        <table>
          <tbody>
            <tr>
              {columns.map((column) => {
                const sortIcon = () => {
                  if (column.id === sortOrder.orderByColumn) {
                    if (sortOrder.orderDirection === 'asc') {
                      return 'UP';
                    }
                    return 'DOWN';
                  } else {
                    return '️SORT';
                  }
                };
                return (
                  <th key={column.id} onClick={() => handleSort(column.id)}>
                    {column.label} {sortIcon()}
                  </th>
                );
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
