import {
  API_AUTH_LOGIN, API_AUTH_ME, API_AUTH_MESSAGE,
} from '@constants/api.constants';
import { get, post } from '@helpers/axios.helper';
import { isHaveToken, removeAuthTokens, setAuthTokens } from '@helpers/auth.helper';
import { apiAuthRefresh, getWithAuth } from '@services/api/gateway';
import { AuthMessageType, AuthMeType, AuthType } from '../../types/auth.types';

export const apiAuthLogin = async (address: string, signature: string): Promise<void> => {
  const oldRefreshToken = localStorage.getItem('refreshToken');

  if (oldRefreshToken && isHaveToken(oldRefreshToken)) {
    await apiAuthRefresh(oldRefreshToken);
    return;
  }

  const { accessToken, refreshToken } = await post<AuthType>(API_AUTH_LOGIN, {
    address,
    signature,
  });

  setAuthTokens(accessToken, refreshToken);
};

export const apiAuthLogout = () => {
  // await post<void>(API_AUTH_LOGOUT);
  removeAuthTokens();
};

export const getAuthMessage = async (): Promise<AuthMessageType> => get<AuthMessageType>(API_AUTH_MESSAGE);

export const getAuthMe = async (): Promise<AuthMeType> => getWithAuth<AuthMeType>(API_AUTH_ME);
