import { createReducer, createAction, createSelector } from '@reduxjs/toolkit';
import { IngredientType } from '../../utils/constants';
import { ActionPrefix } from '../../utils/constants';

// Actions
export const addIngredient = createAction(
  `${ActionPrefix.BURGER_INGREDIENTS}/addIngredient`
);
export const removeIngredient = createAction(
  `${ActionPrefix.BURGER_INGREDIENTS}/removeIngredient`
);
export const sortMainIngredients = createAction(
  `${ActionPrefix.BURGER_INGREDIENTS}/sortMainIngredients`
);

// Reducer
const initialState = {
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
    .addDefaultCase((state) => state);
});

// Selectors
export const getBurgerIngredients = ({ burgerIngredients }) =>
  burgerIngredients.burgerData;

export const getTotalPrice = createSelector(
  getBurgerIngredients,
  (burgerIngredients) => {
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

    return ingredients.reduce((acc, { _id }) => {
      !acc[_id] ? (acc[_id] = 1) : (acc[_id] += 1);
      return acc;
    }, {});
  }
);

export default reducer;
