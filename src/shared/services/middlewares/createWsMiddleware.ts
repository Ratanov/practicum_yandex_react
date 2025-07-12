import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { checkResponse } from '@shared/utils';
import { getCookie } from '@shared/utils';

export type TWsActionTypes<MessageType> = {
  disconnect: ActionCreatorWithoutPayload;
  onConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<MessageType>;
};

export const createWsMiddleware =
  <MessageType>(
    url: string,
    wsActions: TWsActionTypes<MessageType>,
    withRefreshToken: boolean = false
  ): Middleware<{}, RootState> =>
  (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;

      if (wsActions.onConnecting.match(action)) {
        // Если соединение уже существует, не создаем новое
        if (socket) {
          return next(action);
        }

        const accessToken = getCookie('accessToken');
        const socketUrl =
          withRefreshToken && accessToken
            ? `${url}?token=${accessToken.replace('Bearer ', '')}`
            : url;

        socket = new WebSocket(socketUrl);

        socket.onopen = () => {
          dispatch(wsActions.onOpen());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const response = checkResponse.ws(data);
          dispatch(wsActions.onMessage(response));
        };

        socket.onclose = () => {
          socket = null;
          dispatch(wsActions.onClose());
        };

        socket.onerror = () => {
          socket = null;
          dispatch(wsActions.onClose());
        };
      }

      if (wsActions.disconnect.match(action)) {
        if (socket) {
          socket.close();
          socket = null;
        }
      }

      return next(action);
    };
  };
