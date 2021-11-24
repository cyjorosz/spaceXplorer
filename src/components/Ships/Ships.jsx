import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/ti';

import { ErrorMessage } from 'components/Error/ErrorMessage';
import Loading from 'components/Loading/Loading';
import { clearToken } from 'helpers/token';
import useWindowWidth from 'helpers/useWindowWidth';
import * as S from './style';
import { StyledButton } from 'components/Global/styles';

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

  const width = useWindowWidth();

  const isColumnVisible = (column) => {
    console.log('column', column);
    return width > 620 || !column.hiddenOnMobile;
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
              <td onClick={() => viewShipDetails(ship)}>
                <button>view</button>
              </td>
            </tr>
          );
        })}
      </S.Table>
    );
  };

  return (
    <S.Container>
      <S.Header>
        <h1>Space Xplorer</h1>
        <StyledButton onClick={handleLogout}>Log out</StyledButton>
      </S.Header>
      <S.Wrapper>
        {error && <ErrorMessage />}
        {loading ? <Loading /> : null}
        <S.ShipContainer>
          <S.ShipDetail>
            {selectedShip && (
              <div>
                <div>
                  <img src={selectedShip.image ? selectedShip.image : fallbackImage} alt="Ship" />
                </div>
                <div>
                  <h2>{selectedShip.name}</h2>
                  <div>
                    {selectedShip.year_built ? <p>Built: {selectedShip.year_built}</p> : null}
                  </div>
                  <p>{selectedShip.roles.join()}</p>
                </div>
              </div>
            )}
          </S.ShipDetail>
          <Table />
        </S.ShipContainer>

        <S.Pagination>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          {currentPage > 1 && (
            <StyledButton
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </StyledButton>
          )}
          {currentPage < totalPages && (
            <StyledButton
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Next
            </StyledButton>
          )}
        </S.Pagination>
      </S.Wrapper>
    </S.Container>
  );
};

export default Ships;
