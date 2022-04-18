import { NETWORK } from '@constants/network.constants';

export type ConfigType = {
  API_URL: string;
  IS_PROD: boolean;
  REDUX_DEBUG: boolean;
  CLIENT_ID: string;
  NETWORK: NETWORK;
}
