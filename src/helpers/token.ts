export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const saveTokenToSessionStorage = (token: string) => {
  sessionStorage.setItem('token', JSON.stringify(token));
};

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem('token', JSON.stringify(token));
};

export const clearToken = () => {
  sessionStorage.removeItem('token');
  localStorage.removeItem('token');
};
