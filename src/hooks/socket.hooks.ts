import { useConnectToSocket } from '@services/socket';

export const useSocket = (authorizedOnly: boolean): SocketIOClient.Socket | null => {

  const connect = useConnectToSocket();
  // add validation that user authorized
  return (!authorizedOnly) ? connect() : null;
};
