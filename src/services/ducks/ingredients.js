import {
  createReducer,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { ApiRoute } from '../../utils/constants';
import { setError } from './app';
import { ActionPrefix } from '../../utils/constants';

// Actions
export const fetchAllIngredients = createAsyncThunk(
  `${ActionPrefix.INGREDIENTS}/fetchAllIngredients`,
  async (_, { dispatch, rejectWithValue, extra: request }) => {
    try {
      const { data: ingredients } = await request(ApiRoute.INGREDIENTS);
      return ingredients;
    } catch {
      dispatch(setError());
      return rejectWithValue();
    }
  }
);

// Reducer
const initialState = {
  ingredientsList: [],
  isLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAllIngredients.fulfilled, (state, { payload }) => {
      state.ingredientsList = payload;
      state.isLoading = false;
    })
    .addCase(fetchAllIngredients.rejected, (state) => {
      state.isLoading = false;
    })
    .addDefaultCase((state) => state);
});

// Selectors
export const getIngredientsState = ({ ingredients }) => ingredients;
const getAllIngredients = ({ ingredients }) => ingredients.ingredientsList;

export const getFilteredIngredients = createSelector(
  getAllIngredients,
  (ingredients) =>
    ingredients.reduce((acc, ingredient) => {
      const { type } = ingredient;
      !acc[type] ? (acc[type] = [ingredient]) : acc[type].push(ingredient);
      return acc;
    }, {})
);

export default reducer;
