import reducer, { IIngredientsState, fetchAllIngredients } from './ingredients';
import { data } from '../../../utils/data';

const initialState: IIngredientsState = {
  ingredientsList: [],
  isLoading: true,
};

describe('Ingredients reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle fetchAllIngredients fulfilled', () => {
    expect(
      reducer(initialState, {
        type: fetchAllIngredients.fulfilled,
        payload: [data[0], data[1]],
      })
    ).toEqual({
      ingredientsList: [data[0], data[1]],
      isLoading: false,
    });
  });
  it('should handle fetchAllIngredients rejected', () => {
    expect(
      reducer(initialState, {
        type: fetchAllIngredients.rejected,
      })
    ).toEqual({ ingredientsList: [], isLoading: false });
  });
});
