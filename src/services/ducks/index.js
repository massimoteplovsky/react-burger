import appReducer from './app';
import ingredientsReducer from './ingredients';
import burderIngredientsReducer from './burger-ingredients';
import orderReducer from './order';
import userReducer from './user';

const rootReducer = {
  app: appReducer,
  ingredients: ingredientsReducer,
  burgerIngredients: burderIngredientsReducer,
  order: orderReducer,
  user: userReducer,
};

export default rootReducer;
