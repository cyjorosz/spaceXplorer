import styled from 'styled-components';
import { theme } from 'components/Global/theme';

export const Container = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
    font-family: 'Roboto', sans-serif;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    label {
        padding-bottom: 10px;
    }

    input {
    font-size: 16px;
    line-height: 24px;
    height: 40px;
    border:1px solid #dcdcdc;
    border-radius: 4px;
    padding-left: 10px;
    margin-bottom: 10px;
    :hover {
      box-shadow: 1px 1px 8px 1px #dcdcdc;
    }
    :focus-within {
      box-shadow: 1px 1px 8px 1px #dcdcdc;
      outline:none;
    }
    }
    @media (min-width: 768px) {
        width: 40%;
  }
`;

export const ErrorMessage = styled.div`
    padding-bottom: 20px;
    color: ${theme.colors.warning};
`;

export const CheckboxWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    input {
        margin-right: 10px;
        :hover {
            box-shadow: none;
        }
        :focus-within {
            box-shadow: none;
        }
    }
`;


