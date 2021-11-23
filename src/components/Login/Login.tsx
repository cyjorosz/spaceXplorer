import React, { useState } from 'react';
import axios from 'axios';
import { saveTokenToSessionStorage, saveTokenToLocalStorage } from '../../helpers/token';

import * as S from './styles';
interface LoginProps {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const LOGIN_ENDPOINT = 'http://localhost:8080/login';

  const loginUser = async (credentials: LoginProps) => {
    setError('');
    return axios.post(LOGIN_ENDPOINT, credentials).then((data) => {
      let response = data.data;
      if (response.success) {
        rememberMe
          ? saveTokenToLocalStorage(response.token)
          : saveTokenToSessionStorage(response.token);
        window.location.href = '/ships';
      } else {
        setError(response.errorMessage);
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const credentials = {
      username: email,
      password: password,
    };
    await loginUser(credentials);
  };

  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  return (
    <S.Container>
      <h1>Log in</h1>
      <S.ErrorMessage>{error && error}</S.ErrorMessage>
      <S.Form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <S.CheckboxWrapper>
          <input type="checkbox" onChange={handleRememberMe} />
          <label>Remember me</label>
        </S.CheckboxWrapper>
        <S.Button type="submit">Login</S.Button>
      </S.Form>
    </S.Container>
  );
};

export default Login;
