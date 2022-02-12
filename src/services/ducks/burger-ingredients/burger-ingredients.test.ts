import reducer, {
  IBurgerIngredientsState,
  addIngredient,
  removeIngredient,
  sortMainIngredients,
  resetBurgerIngredients,
} from './burger-ingredients';
import { data } from '../../../utils/data';
import { IngredientType } from '../../../utils/constants';

const initialState: IBurgerIngredientsState = {
  burgerData: {
    bunIngredient: null,
    mainIngredients: [],
  },
};

describe('Burger ingredinets reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  it('should handle addIngredient', () => {
    expect(
      reducer(initialState, { type: addIngredient, payload: data[0] })
    ).toEqual({
      burgerData: {
        bunIngredient: data[0].type === IngredientType.BUN ? data[0] : null,
        mainIngredients: data[0].type !== IngredientType.BUN ? [data[0]] : [],
      },
    });
  });
  it('should handle removeIngredient', () => {
    expect(
      reducer(
        {
          burgerData: {
            bunIngredient: null,
            mainIngredients: [data[0]],
          },
        },
        { type: removeIngredient, payload: 0 }
      )
    ).toEqual({
      burgerData: {
        bunIngredient: null,
        mainIngredients: [],
      },
    });
  });
  it('should handle sortMainIngredients', () => {
    expect(
      reducer(
        {
          burgerData: {
            bunIngredient: null,
            mainIngredients: [data[0], data[1]],
          },
        },
        {
          type: sortMainIngredients,
          payload: { startIndex: 0, moveToIndex: 1 },
        }
      )
    ).toEqual({
      burgerData: {
        bunIngredient: null,
        mainIngredients: [data[1], data[0]],
      },
    });
  });
  it('should handle resetBurgerIngredients', () => {
    expect(reducer(initialState, { type: resetBurgerIngredients })).toEqual({
      burgerData: {
        bunIngredient: null,
        mainIngredients: [],
      },
    });
  });
});
