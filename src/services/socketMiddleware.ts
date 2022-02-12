import {
  AnyAction,
  MiddlewareAPI,
  Middleware,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import { Token } from '../utils/constants';
import { getToken } from '../utils/helpers';
import { TOrderResponse } from '../utils/prop-validator';
import { setError } from './ducks/app/app';
import { AppDispatch, RootState } from './store';

type TSocketActions = {
  wsInitAllOrders: ActionCreatorWithoutPayload;
  wsInitUserOrders: ActionCreatorWithoutPayload;
  wsSendMessage: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<TOrderResponse>;
};

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TSocketActions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsInitAllOrders,
        wsInitUserOrders,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsInitAllOrders.toString()) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === wsInitUserOrders.toString()) {
        const token = getToken(Token.ACCESS_TOKEN).split(' ')[1];
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError());
          dispatch(setError(true));
        };

        socket.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          const { success, ...ordersData } = parsedData;
          dispatch(onMessage(ordersData));
        };

        socket.onclose = () => {
          // eslint-disable-next-line no-console
          console.log('Соединение закрыто');
        };

        if (type === onClose.toString()) {
          socket.close();
        }

        if (type === wsSendMessage.toString()) {
          const data = { ...payload };
          socket.send(JSON.stringify(data));
        }
      }

      next(action);
    };
  };
};
