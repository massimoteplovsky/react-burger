import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './ducks';
import request from './api';

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
