import axios from 'axios';
import qs from 'qs';
import { CONFIG } from '@constants/config.constants';

const executeSendRequest = (method: 'post' | 'patch' | 'put', apiUrl: string) => <T>(
  urlPath: string,
  body?: Record<string, unknown>,
  headers?: Record<string, string>,
) => {
  const url = `${apiUrl}${urlPath}`;

  return axios[method]<T>(url, body ? { ...body } : undefined, {
    withCredentials: true,
    headers,
  }).then(({ data }) => data);
};

const executeGetRequest = (method: 'get' | 'delete', apiUrl: string) => <T>(
  urlPath: string,
  query?: Record<string, unknown> | null,
  headers?: Record<string, string>,
) => {
  let url = `${apiUrl}${urlPath}`;
  if (query) {
    url += `?${qs.stringify(query, { encode: true, arrayFormat: 'brackets' })}`;
  }

  return axios[method]<T>(url, { headers }).then(({ data }) => data);
};

export const post = executeSendRequest('post', CONFIG.API_URL);
export const patch = executeSendRequest('patch', CONFIG.API_URL);
export const put = executeSendRequest('put', CONFIG.API_URL);
export const get = executeGetRequest('get', CONFIG.API_URL);
export const del = executeGetRequest('delete', CONFIG.API_URL);

export const coinGeckoPost = executeSendRequest('post', CONFIG.COIN_GECKO_API_URL);
export const coinGeckoPatch = executeSendRequest('patch', CONFIG.COIN_GECKO_API_URL);
export const coinGeckoPut = executeSendRequest('put', CONFIG.COIN_GECKO_API_URL);
export const coinGeckoGet = executeGetRequest('get', CONFIG.COIN_GECKO_API_URL);
export const coinGeckoDel = executeGetRequest('delete', CONFIG.COIN_GECKO_API_URL);

export const polygonScanPost = executeSendRequest('post', CONFIG.POLYGON_SCAN_API_URL);
export const polygonScanPatch = executeSendRequest('patch', CONFIG.POLYGON_SCAN_API_URL);
export const polygonScanPut = executeSendRequest('put', CONFIG.POLYGON_SCAN_API_URL);
export const polygonScanGet = executeGetRequest('get', CONFIG.POLYGON_SCAN_API_URL);
export const polygonScanDel = executeGetRequest('delete', CONFIG.POLYGON_SCAN_API_URL);

axios.interceptors.request.use((config) => config, (error) => Promise.reject(error));

export const getAxiosErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.message;
  }
  return undefined;
};
