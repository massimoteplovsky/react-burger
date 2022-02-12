import { createReducer, createAction, createSelector } from '@reduxjs/toolkit';
import { IngredientType } from '../../../utils/constants';
import { ActionPrefix } from '../../../utils/constants';
import { RootState } from '../../store';
import { TIngredients, TIngredient } from '../../../utils/prop-validator';

export interface IBurgerIngredientsState {
  burgerData: {
    bunIngredient: TIngredient | null;
    mainIngredients: TIngredients;
  };
}

type TSortIngredients = {
  startIndex: number;
  moveToIndex: number;
};

// Actions
export const addIngredient = createAction<TIngredient>(
  `${ActionPrefix.BURGER_INGREDIENTS}/addIngredient`
);
export const removeIngredient = createAction<number>(
  `${ActionPrefix.BURGER_INGREDIENTS}/removeIngredient`
);
export const sortMainIngredients = createAction<TSortIngredients>(
  `${ActionPrefix.BURGER_INGREDIENTS}/sortMainIngredients`
);
export const resetBurgerIngredients = createAction(
  `${ActionPrefix.BURGER_INGREDIENTS}/resetBurgerIngredients`
);

// Reducer
const initialState: IBurgerIngredientsState = {
  burgerData: {
    bunIngredient: null,
    mainIngredients: [],
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addIngredient, (state, { payload: ingredient }) => {
      if (ingredient.type === IngredientType.BUN) {
        state.burgerData.bunIngredient = ingredient;
        return;
      }
      state.burgerData.mainIngredients.push(ingredient);
    })
    .addCase(sortMainIngredients, (state, { payload }) => {
      const { startIndex, moveToIndex } = payload;
      const ingredient = state.burgerData.mainIngredients[startIndex];
      const mainIngredients = [
        ...state.burgerData.mainIngredients.slice(0, startIndex),
        ...state.burgerData.mainIngredients.slice(startIndex + 1),
      ];

      mainIngredients.splice(moveToIndex, 0, ingredient);
      state.burgerData.mainIngredients = mainIngredients;
    })
    .addCase(removeIngredient, (state, { payload: ingredientIndex }) => {
      state.burgerData.mainIngredients.splice(ingredientIndex, 1);
    })
    .addCase(resetBurgerIngredients, () => initialState)
    .addDefaultCase((state) => state);
});

// Selectors
export const getBurgerIngredients = ({
  burgerIngredients,
}: RootState): { bunIngredient: TIngredient; mainIngredients: TIngredients } =>
  burgerIngredients.burgerData;

export const getTotalPrice = createSelector(
  getBurgerIngredients,
  (burgerIngredients): number => {
    const { bunIngredient, mainIngredients } = burgerIngredients;
    const bunPrice = bunIngredient?.price * 2 || 0;

    const totalPrice =
      mainIngredients.reduce(
        (totalPrice, { price }) => (totalPrice += price),
        0
      ) + bunPrice;

    return totalPrice;
  }
);

export const getBurgerIgredientsIdsCount = createSelector(
  getBurgerIngredients,
  (burgerIngredients) => {
    const { bunIngredient, mainIngredients } = burgerIngredients;
    const ingredients = bunIngredient
      ? [bunIngredient, ...mainIngredients]
      : mainIngredients;

    return ingredients.reduce<Record<string, number>>((acc, { _id }) => {
      !acc[_id] ? (acc[_id] = 1) : (acc[_id] += 1);
      return acc;
    }, {});
  }
);

export default reducer;
