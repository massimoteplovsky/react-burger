import { createAction, createReducer } from '@reduxjs/toolkit';
import { ActionPrefix } from '../../utils/constants';

// Actions
export const setCurrentIngredient = createAction(
  `${ActionPrefix.CURRENT_INGREDIENT}/setCurrentIngredient`
);

// Reducer
const initialState = {
  ingredient: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentIngredient, (state, { payload }) => {
      state.ingredient = payload;
    })
    .addDefaultCase((state) => state);
});

// Selectors
export const getCurrentIngredient = ({ currentIngredient }) =>
  currentIngredient.ingredient;

export default reducer;
