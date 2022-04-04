import io from 'socket.io-client';
import { showToast } from '@components/Toast';
import { TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING } from '@constants/toast.constants';
import { SocketDataDTO } from '@dtos/socketData.dto';
import { useCallback } from 'react';

let socketIo: SocketIOClient.Socket;
export const useConnectToSocket: () => () => SocketIOClient.Socket = () => useCallback(() => {
  if (socketIo) {
    return socketIo;
  }
  socketIo = io.connect('http://localhost:9000');

  socketIo.on('connect', () => {
    showToast(`Connected to socket: ${socketIo.id}`, TOAST_SUCCESS);
  });

  socketIo.once('connect_error', () => {
    showToast('Can not connect to socket!', TOAST_WARNING);
  });

  socketIo.once('disconnect', () => {
    showToast('Disconnected from socket!', TOAST_ERROR);
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  socketIo.on('data', (_data: SocketDataDTO) => {
    // work with data
  });
  return socketIo;
}, []);

export const disconnectFromSocket = (socket: SocketIOClient.Socket): void => {
  socket.disconnect();
};
