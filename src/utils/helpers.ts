import { Token } from './constants';

export const setToken = (name: string, value: string): void => {
  localStorage.setItem(name, value);
};

export const deleteToken = (name: string): void => {
  localStorage.removeItem(name);
};

export const getToken = (name: string): string => {
  return localStorage.getItem(name);
};

export const checkAuth = (): boolean => Boolean(getToken(Token.ACCESS_TOKEN));
