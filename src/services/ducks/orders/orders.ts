import {
  createReducer,
  createAction,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {
  IngredientType,
  ActionPrefix,
  ApiRoute,
} from '../../../utils/constants';
import { getAllIngredients } from '../ingredients/ingredients';
import { chunk } from '../../../utils/helpers';
import {
  TOrderResponse,
  TIngredients,
  TOrder,
} from '../../../utils/prop-validator';
import { RootState, AppDispatch } from '../../store';
import { setError } from '../app/app';

export interface IOrdersState {
  isLoading: boolean;
  isConnected: boolean;
  ordersData: TOrderResponse | null;
  currentOrder: TOrder | null;
}

// Actions
export const wsInitAllOrders = createAction(
  `${ActionPrefix.ORDERS}/wsInitAllOrders`
);
export const wsInitUserOrders = createAction(
  `${ActionPrefix.ORDERS}/wsInitUserOrders`
);
export const wsSendMessage = createAction(
  `${ActionPrefix.ORDERS}/wsSendMessage`
);
export const wsConnectionSuccess = createAction(
  `${ActionPrefix.ORDERS}/wsConnectionSuccess`
);
export const wsConnectionError = createAction(
  `${ActionPrefix.ORDERS}/wsConnectionError`
);
export const wsConnectionClosed = createAction(
  `${ActionPrefix.ORDERS}/wsConnectionClosed`
);
export const wsGetMessage = createAction(`${ActionPrefix.ORDERS}/wsGetMessage`);
export const clearCurrentOrder = createAction(
  `${ActionPrefix.ORDERS}/clearCurrentOrder`
);

export const fetchCurrentOrder = createAsyncThunk<
  TOrder,
  string,
  {
    rejectValue: void;
    dispatch: AppDispatch;
    extra: {
      request: (endpoint: string) => Promise<TOrderResponse>;
    };
  }
>(
  `${ActionPrefix.ORDERS}/fetchCurrentOrder`,
  async (orderNumber, { dispatch, rejectWithValue, extra: { request } }) => {
    try {
      const orderData = await request(`${ApiRoute.ORDERS}/${orderNumber}`);
      const order = orderData.orders.find(
        ({ number }) => number === Number(orderNumber)
      );
      return order ? order : null;
    } catch {
      dispatch(setError(true));
      return rejectWithValue();
    }
  }
);

// Reducer
const initialState: IOrdersState = {
  isLoading: false,
  isConnected: false,
  ordersData: null,
  currentOrder: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchCurrentOrder.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchCurrentOrder.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.currentOrder = payload;
  });
  builder.addCase(fetchCurrentOrder.rejected, () => initialState);
  builder.addCase(clearCurrentOrder, (state) => {
    state.currentOrder = null;
  });
  builder.addCase(wsConnectionSuccess, (state) => {
    state.isConnected = true;
  });
  builder.addCase(wsConnectionError, () => initialState);
  builder.addCase(wsConnectionClosed, () => initialState);
  builder.addCase(wsGetMessage, (state, { payload }) => {
    state.ordersData = payload;
  });
  builder.addDefaultCase((state) => state);
});

// Selectors
const populateIngredients = (
  ingredientsIds: string[],
  allIngredients: TIngredients
) => {
  const ingredientsList = ingredientsIds
    .map((id) => allIngredients.find((ingredient) => ingredient._id === id))
    .reduce((acc, ingredient) => {
      const ingredientIndex = acc.findIndex(
        (item) => item._id === ingredient._id
      );

      ingredientIndex === -1
        ? acc.push({
            ...ingredient,
            quantity: ingredient.type === IngredientType.BUN ? 2 : 1,
          })
        : (acc[ingredientIndex].quantity += 1);
      return acc;
    }, [])
    .sort((a, b) => a.quantity - b.quantity);

  const bunIndex = ingredientsList.findIndex(
    ({ type }) => type === IngredientType.BUN
  );

  return bunIndex !== -1
    ? [
        ingredientsList[bunIndex],
        ...ingredientsList.slice(0, bunIndex),
        ...ingredientsList.slice(bunIndex + 1),
      ]
    : ingredientsList;
};

const calculateTotalPrice = (ingredients: TIngredients) => {
  return ingredients.reduce((acc, { price, quantity }) => {
    return (acc += price * quantity);
  }, 0);
};

export const getOrdersState = ({ orders }: RootState): IOrdersState => orders;

export const getAllOrders = createSelector(
  [getOrdersState, getAllIngredients],
  (ordersState, allIngredients) => {
    const { ordersData } = ordersState;

    if (!ordersData) return null;

    const newOrders = ordersData.orders.map((order) => {
      const populatedIngredients = populateIngredients(
        order.ingredients,
        allIngredients
      );
      return {
        ...order,
        ingredients: populatedIngredients,
        totalPrice: calculateTotalPrice(populatedIngredients),
      };
    });

    return { ...ordersData, orders: newOrders };
  }
);

export const getFilteredOrders = createSelector(
  getOrdersState,
  (ordersState) => {
    const { ordersData } = ordersState;
    if (!ordersData) return null;

    const order = ordersData.orders.reduce<Record<string, number[]>>(
      (acc, { status, number }) => {
        acc[status] ? acc[status].push(number) : (acc[status] = [number]);
        return acc;
      },
      {}
    );

    return Object.keys(order).reduce<Record<string, Array<number[]>>>(
      (acc, key) => {
        acc[key] = chunk(order[key], 10);
        return acc;
      },
      {}
    );
  }
);

export const getOrder = createSelector(
  [getOrdersState, getAllIngredients],
  (ordersState, allIngredients) => {
    const { currentOrder } = ordersState;

    if (!currentOrder) return null;

    const populatedIngredients = populateIngredients(
      currentOrder.ingredients,
      allIngredients
    );

    return {
      ...currentOrder,
      ingredients: populatedIngredients,
      totalPrice: calculateTotalPrice(populatedIngredients),
    };
  }
);

export const wsAction = {
  wsInitAllOrders,
  wsInitUserOrders,
  wsSendMessage: wsSendMessage,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetMessage,
};

export default reducer;
