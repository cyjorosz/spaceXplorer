import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/ti';

import { Error } from 'components/Error/Error';
import Loading from 'components/Loading/Loading';
import * as S from './style';

import useWindowWidth from 'helpers/useWindowWidth';
import { desktopColumns, mobileColumns } from './Columns';

// TO DO
// - Header:
//   - Displays title, description (copied from docs).
//   - Log out button (routes to login page and removes authentication flag from local storage if it's persisted).

// - Left - Table:
//   - The table should be server-side paginated with 10 results by page. Pagination controls should contain buttons for previous/next page and total number of pages.

// - Right - Details view:
//   - Displays 'launches' list that contains urls to wikipeadia articles about the launches ship was apart of

const Ships = () => {
  const SHIPS_API = `https://api.spacexdata.com/v4/ships`;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState();
  const [sortOrder, setSortOrder] = useState({ orderDirection: 'asc', orderByColumn: 'id' });

  const { width } = useWindowWidth();
  const breakpoint = 620;

  const fetchShipsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(SHIPS_API);
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

  const MobileTable = () => {
    return (
      <S.MobileTable>
        <tr>
          {mobileColumns.map((column) => {
            const sortIcon = () => {
              if (column.id === sortOrder.orderByColumn) {
                if (sortOrder.orderDirection === 'asc') {
                  return <TiArrowSortedUp />;
                }
                return <TiArrowSortedDown />;
              } else {
                return <TiArrowUnsorted />;
              }
            };
            return (
              <th key={column.id} onClick={() => handleSort(column.id)}>
                {column.label} {column.id !== 'details' ? sortIcon() : null}
              </th>
            );
          })}
        </tr>
        {ships &&
          ships.map((ship) => {
            return (
              <tr key={ship.id}>
                {mobileColumns.map((column) => {
                  let description = ship[column.id];
                  if (column.id === 'active') {
                    description = description ? 'yes' : 'no';
                  }
                  return <td>{description}</td>;
                })}
                <td onClick={() => viewShipDetails(ship)}>view</td>
              </tr>
            );
          })}
      </S.MobileTable>
    );
  };

  const DesktopTable = () => {
    return (
      <S.DesktopTable>
        <tr>
          {desktopColumns.map((column) => {
            const sortIcon = () => {
              if (column.id === sortOrder.orderByColumn) {
                if (sortOrder.orderDirection === 'asc') {
                  return <TiArrowSortedUp />;
                }
                return <TiArrowSortedDown />;
              } else {
                return <TiArrowUnsorted />;
              }
            };
            return (
              <th key={column.id} onClick={() => handleSort(column.id)}>
                {column.label} {column.id !== 'details' ? sortIcon() : null}
              </th>
            );
          })}
        </tr>
        {ships &&
          ships.map((ship) => {
            return (
              <tr key={ship.id}>
                {desktopColumns.map((column) => {
                  let description = ship[column.id];
                  if (column.id === 'active') {
                    description = description ? 'yes' : 'no';
                  }
                  return <td>{description}</td>;
                })}
              </tr>
            );
          })}
      </S.DesktopTable>
    );
  };

  return (
    <>
      <div>
        <h1>Header Component</h1>
        <Link to="/login">Log out</Link>
      </div>
      <div>
        <h2>Table with data from spaceX API</h2>

        <div>
          {error && <Error error={error} />}
          {loading ? <Loading /> : null}
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
                <p>{selectedShip.roles.join()}</p>
              </div>
            </div>
          )}
        </div>
        {width < breakpoint ? <MobileTable /> : <DesktopTable />}
      </div>
    </>
  );
};

export default Ships;
