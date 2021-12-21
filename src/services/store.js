import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './ducks';
import createRequest from '../utils/api';
import { setError } from './ducks/app';

const onRequestFail = () => {
  store.dispatch(setError(true));
};

const request = createRequest(onRequestFail);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: request,
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});
