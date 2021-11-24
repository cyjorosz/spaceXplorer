import styled from 'styled-components'
import { theme } from 'components/Global/theme';

export const Container = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
    font-family: 'Roboto', sans-serif;
`;

export const Header = styled.div`
    border-bottom: 1px solid ${theme.colors.grey};
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    h1 {
        background: -webkit-linear-gradient(0deg,#ffa745,#fe869f 30%,#ef7ac8 45%,#a083ed 70%,#43aeff 85%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;  
    }
`;

export const Wrapper = styled.div`
    padding: 20px 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 60%;
    margin: auto;
`;

export const ShipContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row-reverse;
  }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    td, th {
        border: 1px solid ${theme.colors.grey};
        padding: 0.5rem;
        text-align: left;
}`;

export const ShipDetail = styled.div`
    img {
    max-width: 200px;
    height: 150px; 
    }
`;

export const Pagination = styled.div`
    margin-top: 20px;
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
`;
