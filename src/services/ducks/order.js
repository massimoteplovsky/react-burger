import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import { ApiRoute } from '../../utils/constants';
import { setError } from './app';
import { ActionPrefix } from '../../utils/constants';

// Actions
export const resetOrder = createAction(`${ActionPrefix.ORDER}/resetOrder`);

export const sendOrder = createAsyncThunk(
  `${ActionPrefix.ORDER}/sendOrder`,
  async (ingredientsIds, { dispatch, rejectWithValue, extra: request }) => {
    try {
      const {
        order: { number },
      } = await request(ApiRoute.ORDERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredientsIds }),
      });
      return number;
    } catch {
      dispatch(setError());
      return rejectWithValue();
    }
  }
);

// Reducer
const initialState = {
  orderNumber: null,
  isLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(sendOrder.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(sendOrder.fulfilled, (state, { payload }) => {
      state.orderNumber = payload;
      state.isLoading = false;
    })
    .addCase(sendOrder.rejected, () => initialState)
    .addCase(resetOrder, (state) => {
      state.orderNumber = null;
    })
    .addDefaultCase((state) => state);
});

// Selectors
export const getOrderState = ({ order }) => order;

export default reducer;
