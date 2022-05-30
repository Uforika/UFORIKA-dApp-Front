import { Mutex } from 'async-mutex';
import {
  del, get, patch, post, put,
} from '@helpers/axios.helper';
import { isHaveToken, setAuthTokens } from '@helpers/auth.helper';
import { API_AUTH_REFRESH } from '@constants/api.constants';
import { AuthType } from '../../types/auth.types';

const mutex = new Mutex();

type SendMethodType = <T>(
  urlPath: string,
  body?: Record<string, unknown>,
  headers?: Record<string, string>,
) => Promise<T>

type GetMethodType = <T>(
  urlPath: string,
  query?: Record<string, unknown> | null,
  headers?: Record<string, string>,
) => Promise<T>

export const apiAuthRefresh = async (oldRefreshToken: string): Promise<void> => {
  const { accessToken, refreshToken } = await post<AuthType>(API_AUTH_REFRESH, { refreshToken: oldRefreshToken });

  setAuthTokens(accessToken, refreshToken);
};

const getAuthHeader = async () => {
  await mutex.waitForUnlock();
  let accessToken = localStorage.getItem('accessToken');
  if (!isHaveToken(accessToken)) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken && isHaveToken(refreshToken)) {
      await mutex.runExclusive(async () => {
        await apiAuthRefresh(refreshToken);
      });
    }
    accessToken = localStorage.getItem('accessToken');
  }
  return { Authorization: `Bearer ${accessToken ?? ''}` };
};

const updateSendRequest = (method: SendMethodType) => async <T>(
  urlPath: string,
  body?: Record<string, unknown>,
  headers?: Record<string, string>,
) => {
  const authHeader = await getAuthHeader();

  return method <T>(urlPath, body, { ...authHeader, ...headers });
};

const updateGetRequest = (method: GetMethodType) => async <T>(
  urlPath: string,
  query?: Record<string, unknown> | null,
  headers?: Record<string, string>,
) => {
  const authHeader = await getAuthHeader();

  return method<T>(urlPath, query, { ...authHeader, ...headers });
};

export const postWithAuth = updateSendRequest(post);
export const patchWithAuth = updateSendRequest(patch);
export const putWithAuth = updateSendRequest(put);
export const getWithAuth = updateGetRequest(get);
export const delWithAuth = updateGetRequest(del);
