import { createAction, createReducer } from '@reduxjs/toolkit';
import { ActionPrefix } from '../../utils/constants';

// Actions
export const setError = createAction(`${ActionPrefix.APP}/setError`);

// Reducer
const initialState = {
  isError: false,
};
const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state) => {
      state.isError = true;
    })
    .addDefaultCase((state) => state);
});

// Selectors
export const getAppState = ({ app }) => app;

export default appReducer;
