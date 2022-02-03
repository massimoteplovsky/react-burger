import { createAction, createReducer } from '@reduxjs/toolkit';
import { ActionPrefix } from '../../utils/constants';
import { RootState } from '../store';

interface IAppState {
  isError: boolean;
}

// Actions
export const setError = createAction<boolean>(`${ActionPrefix.APP}/setError`);

// Reducer
const initialState: IAppState = {
  isError: false,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state, { payload }) => {
      state.isError = payload;
    })
    .addDefaultCase((state) => state);
});

// Selectors
export const getAppState = ({ app }: RootState): IAppState => app;

export default appReducer;
