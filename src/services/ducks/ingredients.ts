import {
  createReducer,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { ApiRoute } from '../../utils/constants';
import { ActionPrefix } from '../../utils/constants';
import { setError } from './app';
import { RootState, AppDispatch } from '../store';
import { TIngredient, TIngredients } from '../../utils/prop-validator';

interface IIngredientsState {
  ingredientsList: TIngredients;
  isLoading: boolean;
}

// Actions
export const fetchAllIngredients = createAsyncThunk<
  TIngredients,
  void,
  {
    rejectValue: void;
    dispatch: AppDispatch;
    extra: { request: (endpoint: string) => Promise<{ data: TIngredients }> };
  }
>(
  `${ActionPrefix.INGREDIENTS}/fetchAllIngredients`,
  async (_, { rejectWithValue, dispatch, extra: { request } }) => {
    try {
      const { data } = await request(ApiRoute.INGREDIENTS);
      return data;
    } catch {
      dispatch(setError(true));
      return rejectWithValue();
    }
  }
);

// Reducer
const initialState: IIngredientsState = {
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
      state.ingredientsList = [];
      state.isLoading = false;
    })
    .addDefaultCase((state) => state);
});

// Selectors
export const getIngredientsState = ({
  ingredients,
}: RootState): IIngredientsState => ingredients;

export const getAllIngredients = ({ ingredients }: RootState): TIngredients =>
  ingredients.ingredientsList;

export const getIngredient =
  (ingredientId: string) =>
  ({ ingredients }: RootState): TIngredient =>
    ingredients.ingredientsList.find(({ _id }) => _id === ingredientId);

export const getFilteredIngredients = createSelector(
  getAllIngredients,
  (ingredients) =>
    ingredients.reduce<Record<string, TIngredients>>((acc, ingredient) => {
      const { type } = ingredient;
      !acc[type] ? (acc[type] = [ingredient]) : acc[type].push(ingredient);
      return acc;
    }, {})
);

export default reducer;
