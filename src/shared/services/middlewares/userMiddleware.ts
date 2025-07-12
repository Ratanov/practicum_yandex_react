import {
  wsOnClose,
  wsOnConnecting,
  wsOnMessage,
  wsOnOpen,
} from '../reducers/userSlice';

import { createWsMiddleware } from './createWsMiddleware';

export const userWsMiddleware = createWsMiddleware(
  'wss://norma.nomoreparties.space/orders',
  {
    onConnecting: wsOnConnecting,
    onClose: wsOnClose,
    disconnect: wsOnClose,
    onMessage: wsOnMessage,
    onOpen: wsOnOpen,
  },
  true
);
