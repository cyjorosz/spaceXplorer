import styled from 'styled-components';
import { theme } from './theme';

export const StyledButton = styled.button`
    background-color: ${theme.colors.pink};
    border: 1px solid ${theme.colors.pink};
    border-radius: 4px;
    font-size: 16px;
    line-height: 24px;
    color: white;
    height: 40px;
    width: 100px;
    :hover {
    cursor: pointer;
    background: ${theme.colors.gradient};
    }
`;
