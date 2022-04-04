import { post } from '@helpers/axios.helper';
import { API_AUTH_LOGIN, API_AUTH_LOGOUT } from '@constants/api.constants';
import { removeCookieByName, setCookieByName } from '@helpers/cookie.helper';

export const apiAuthLogin = async (username: string, password: string): Promise<void> => {
  const { accessToken } = await post<{ accessToken: string }>(API_AUTH_LOGIN, {
    username,
    password,
  });
  setCookieByName('Authorization', accessToken);
};

export const apiAuthLogout = async (): Promise<void> => {
  await post<void>(API_AUTH_LOGOUT);
  removeCookieByName('Authorization');
};
