// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { TokenType } from '../types/token.types';

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeAuthTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const isHaveToken = (token: string | null) => {
  if (!token) return false;
  const decodedToken = jwt_decode<TokenType>(token);
  const timeNow = new Date();
  const timeExpToken = new Date(decodedToken.exp * 1000);

  return timeNow < timeExpToken;
};
