import { NETWORK } from '@constants/network.constants';

export type ConfigType = {
  API_URL: string;
  IS_PROD: boolean;
  REDUX_DEBUG: boolean;
  CLIENT_ID: string;
  COIN_GECKO_API_URL: string;
  POLYGON_SCAN_API_URL: string;
  API_POLYGON_SCAN_KEY: string;
  NETWORK: NETWORK;
}
