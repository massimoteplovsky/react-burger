import { createAction, createReducer } from '@reduxjs/toolkit';
import { ActionPrefix } from '../../utils/constants';

// Actions
export const setIngredient = createAction(
  `${ActionPrefix.INGREDIENT}/setIngredient`
);

// Reducer
const initialState = {
  ingredient: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setIngredient, (state, { payload }) => {
      state.ingredient = payload;
    })
    .addDefaultCase((state) => state);
});

// Selectors
export const getIngredient = ({ ingredient }) => ingredient;

export default reducer;
