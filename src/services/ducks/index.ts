import appReducer from './app';
import ingredientsReducer from './ingredients';
import burderIngredientsReducer from './burger-ingredients';
import orderReducer from './order';
import userReducer from './user';
import ordersReducer from './orders';

const rootReducer = {
  app: appReducer,
  ingredients: ingredientsReducer,
  burgerIngredients: burderIngredientsReducer,
  order: orderReducer,
  orders: ordersReducer,
  user: userReducer,
};

export default rootReducer;
