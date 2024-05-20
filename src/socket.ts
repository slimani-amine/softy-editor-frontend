import { getItem } from '@/lib/localStorage';
import { createContext } from 'react';
import io from 'socket.io-client';

const token = getItem<string>('token');
export const socket = io('http://127.0.0.1:4040', {
  transports: ['websocket'],
  query: {
    token,
  },
});
export const SocketContext = createContext(socket);

export default socket;
