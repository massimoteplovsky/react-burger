import { createAction, createReducer } from '@reduxjs/toolkit';
import { ActionPrefix } from '../../utils/constants';

// Actions
export const setError = createAction(`${ActionPrefix.APP}/setError`);
export const openModal = createAction(`${ActionPrefix.APP}/openModal`);
export const closeModal = createAction(`${ActionPrefix.APP}/closeModal`);

// Reducer
const initialState = {
  isError: false,
  isModalOpen: false,
  modalType: null,
};
const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state) => {
      state.isError = true;
    })
    .addCase(openModal, (state, { payload }) => {
      state.isModalOpen = true;
      state.modalType = payload;
    })
    .addCase(closeModal, (state) => {
      state.isModalOpen = false;
      state.modalType = null;
    })
    .addDefaultCase((state) => state);
});

// Selectors
export const getAppState = ({ app }) => app;

export default appReducer;
