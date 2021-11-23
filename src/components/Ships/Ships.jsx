import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/ti';

import { Error } from 'components/Error/Error';
import Loading from 'components/Loading/Loading';
import { clearToken } from 'helpers/token';
import useWindowWidth from 'helpers/useWindowWidth';
import * as S from './style';

const Ships = () => {
  const SHIPS_API = `https://api.spacexdata.com/v4/ships`;
  const fallbackImage = 'https://www.fillmurray.com/640/360';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState();
  const [sortOrder, setSortOrder] = useState({ orderDirection: 'asc', orderByColumn: 'id' });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { pageWidth } = useWindowWidth();

  const isColumnVisible = (column) => {
    return pageWidth > 620 || !column.hiddenOnMobile;
  };

  const columns = [
    { id: 'name', label: 'Name', hiddenOnMobile: false },
    { id: 'type', label: 'Type', hiddenOnMobile: false },
    { id: 'active', label: 'Active', hiddenOnMobile: true },
    { id: 'year_built', label: 'Year Built', hiddenOnMobile: true },
    { id: 'home_port', label: 'Home Port', hiddenOnMobile: true },
  ];

  const getCurrentRows = () => {
    if (!ships) {
      return [];
    }
    return [...ships].slice((currentPage - 1) * rowsPerPage, rowsPerPage * currentPage);
  };

  const fetchShipsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(SHIPS_API);
      setLoading(false);
      setTotalPages(Math.ceil(response.data.length / rowsPerPage));
      setShips(response.data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchShipsData();
  }, [currentPage]);

  const sortRows = (rows, sortOrder) => {
    const orderByColumn = sortOrder.orderByColumn;
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
    let orderDirection = 'asc';
    if (sortOrder.orderByColumn === orderByColumn) {
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

  const handleLogout = () => {
    clearToken();
    window.location.href = '/login';
  };

  const Table = () => {
    return (
      <S.Table>
        <tr>
          {columns.map((column) => {
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
              isColumnVisible(column) && (
                <th key={column.id} onClick={() => handleSort(column.id)}>
                  {column.label} {column.id !== 'details' ? sortIcon() : null}
                </th>
              )
            );
          })}
          <th>Details</th>
        </tr>
        {getCurrentRows().map((ship) => {
          return (
            <tr key={ship.id}>
              {columns.map((column) => {
                let description = ship[column.id];
                if (column.id === 'active') {
                  description = description ? 'yes' : 'no';
                }
                return isColumnVisible(column) && <td>{description}</td>;
              })}
              <td onClick={() => viewShipDetails(ship)}>view</td>
            </tr>
          );
        })}
      </S.Table>
    );
  };

  return (
    <>
      <div>
        <h1>Header Component</h1>
        <button onClick={handleLogout}>Log out</button>
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
                  src={selectedShip.image ? selectedShip.image : fallbackImage}
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
        <Table />
        <div>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          {currentPage > 1 && (
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </button>
          )}
          {currentPage < totalPages && (
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Ships;
