import appReducer from './app';
import ingredientsReducer from './ingredients';
import burderIngredientsReducer from './burger-ingredients';
import ingredientReducer from './ingredient';
import orderReducer from './order';

const rootReducer = {
  app: appReducer,
  ingredients: ingredientsReducer,
  burgerIngredients: burderIngredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
};

export default rootReducer;
