import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/ti';

import Loading from 'components/Loading/Loading';
import { clearToken } from 'helpers/token';
import useWindowWidth from 'helpers/useWindowWidth';

import * as S from './styles';
import { StyledButton } from 'components/Global/styles';
interface TableColumn {
  id: string;
  label: string;
  hiddenOnMobile: boolean;
}
interface SortOrder {
  orderDirection: string;
  orderByColumn: string;
}
interface Ship {
  id: string;
  name: string;
  type: string;
  active: boolean;
  year_built?: number;
  home_port?: string;
  image?: string;
  roles?: string[];
}

const columns: TableColumn[] = [
  { id: 'name', label: 'Name', hiddenOnMobile: false },
  { id: 'type', label: 'Type', hiddenOnMobile: false },
  { id: 'active', label: 'Active', hiddenOnMobile: true },
  { id: 'year_built', label: 'Year Built', hiddenOnMobile: true },
  { id: 'home_port', label: 'Home Port', hiddenOnMobile: true },
];

const Ships = () => {
  const SHIPS_API = `https://api.spacexdata.com/v4/ships`;
  const fallbackImage = 'https://www.fillmurray.com/640/360';

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [ships, setShips] = useState<Array<Ship>>([]);
  const [selectedShip, setSelectedShip] = useState<Ship>();
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    orderDirection: 'asc',
    orderByColumn: 'id',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const width = useWindowWidth();

  const isColumnVisible = (column: TableColumn) => {
    return width > 620 || !column.hiddenOnMobile;
  };

  const columns: TableColumn[] = [
    { id: 'name', label: 'Name', hiddenOnMobile: false },
    { id: 'type', label: 'Type', hiddenOnMobile: false },
    { id: 'active', label: 'Active', hiddenOnMobile: true },
    { id: 'year_built', label: 'Year Built', hiddenOnMobile: true },
    { id: 'home_port', label: 'Home Port', hiddenOnMobile: true },
  ];

  const getColumnStringValue = (ship: Ship, column: TableColumn): string => {
    switch (column.id) {
      case 'name':
        return ship.name;
      case 'type':
        return ship.type;
      case 'active':
        return ship.active ? 'yes' : 'no';
      case 'year_built':
        return ship.year_built ? ship.year_built.toString() : 'unknown';
      case 'home_port':
      default:
        return ship.home_port ? ship.home_port : 'unknown';
    }
  };

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
      const ships: Ship[] = response.data;
      setShips(ships);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    fetchShipsData();
  }, [currentPage]);

  const sortRows = (rows: Ship[], sortOrder: SortOrder) => {
    const orderByColumn = sortOrder.orderByColumn;
    const sortedRows = rows.sort((a, b) => {
      let ascendingOrder = 1;
      switch (sortOrder.orderByColumn) {
        case 'name':
          ascendingOrder = a.name > b.name ? 1 : -1;
          break;
        case 'type':
          ascendingOrder = a.type > b.type ? 1 : -1;
          break;
        case 'active':
          ascendingOrder = a.active > b.active ? 1 : -1;
          break;
        case 'year_built':
          const yearA = a.year_built ? a.year_built : 0;
          const yearB = b.year_built ? b.year_built : 0;
          ascendingOrder = yearA > yearB ? 1 : -1;
          break;
        case 'home_port':
        default:
          const homePortA = a.home_port ? a.home_port : 'unknown';
          const homePortB = b.home_port ? b.home_port : 'unknown';
          ascendingOrder = homePortA > homePortB ? 1 : -1;
          break;
      }
      if (sortOrder.orderDirection === 'asc') {
        return ascendingOrder;
      } else {
        return ascendingOrder * -1;
      }
    });
    return sortedRows;
  };

  useMemo(() => sortRows(ships, sortOrder), [ships, sortOrder]);

  const handleSort = (orderByColumn: string) => {
    let orderDirection = 'asc';
    if (sortOrder.orderByColumn === orderByColumn) {
      orderDirection = sortOrder.orderDirection === 'asc' ? 'desc' : 'asc';
    }
    setSortOrder(() => ({
      orderDirection: orderDirection,
      orderByColumn: orderByColumn,
    }));
  };

  const viewShipDetails = (ship: Ship) => {
    setSelectedShip(ship);
  };

  const handleLogout = () => {
    clearToken();
    window.location.href = '/login';
  };

  const Table = () => {
    return (
      <S.Table>
        <thead>
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
        </thead>
        <tbody>
          {getCurrentRows().map((ship) => {
            return (
              <tr key={ship.id}>
                {columns.map((column) => {
                  let description = getColumnStringValue(ship, column);
                  return (
                    isColumnVisible(column) && (
                      <td key={ship.id.toString() + column.id}>{description}</td>
                    )
                  );
                })}
                <td onClick={() => viewShipDetails(ship)}>
                  <button>view</button>
                </td>
              </tr>
            );
          })}
        </tbody>
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
        {errorMessage && <div>{errorMessage}</div>}
        {loading ? <Loading /> : null}
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
                <p>{selectedShip.roles && selectedShip.roles.join()}</p>
              </div>
            </div>
          )}
        </S.ShipDetail>
        <S.ShipContainer>
          <Table />
          <S.Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </S.ShipContainer>
      </S.Wrapper>
    </S.Container>
  );
};

export default Ships;
