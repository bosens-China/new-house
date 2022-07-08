const key = 'app-token';

export const setToken = (token: string) => {
  window.localStorage.setItem(key, token);
};
export const getToken = () => window.localStorage.getItem(key);
