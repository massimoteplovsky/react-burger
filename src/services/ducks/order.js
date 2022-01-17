import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import { ApiRoute, Token } from '../../utils/constants';
import { refreshUserToken } from './user';
import { ActionPrefix } from '../../utils/constants';
import { getToken } from '../../utils/helpers';

// Actions
export const resetOrder = createAction(`${ActionPrefix.ORDER}/resetOrder`);

export const sendOrder = createAsyncThunk(
  `${ActionPrefix.ORDER}/sendOrder`,
  async (ingredientsIds, { dispatch, rejectWithValue, extra: request }) => {
    const accessToken = getToken(Token.ACCESS_TOKEN);
    try {
      const {
        order: { number },
      } = await request(ApiRoute.ORDERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        body: JSON.stringify({ ingredients: ingredientsIds }),
      });
      return number;
    } catch (err) {
      if (err.message) {
        dispatch(refreshUserToken(() => sendOrder(ingredientsIds)));
        return rejectWithValue();
      }
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
