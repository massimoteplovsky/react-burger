import {
  configureStore,
  ActionCreator,
  AnyAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import rootReducer from './ducks';
import createRequest from '../utils/api';
import { setError } from './ducks/app/app';
import { socketMiddleware } from './socketMiddleware';
import { wsAction } from './ducks/orders/orders';

const wsEndpoint = 'wss://norma.nomoreparties.space/orders';

const onRequestFail = () => {
  store.dispatch(setError(true));
};

const request = createRequest(onRequestFail);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { request },
      },
    }).concat(socketMiddleware(wsEndpoint, wsAction)),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppThunk<TReturn = void | Promise<Response>> = ActionCreator<
  ThunkAction<TReturn, RootState, unknown, AnyAction>
>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
