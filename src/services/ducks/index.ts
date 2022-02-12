import appReducer from './app/app';
import ingredientsReducer from './ingredients/ingredients';
import burderIngredientsReducer from './burger-ingredients/burger-ingredients';
import orderReducer from './order/order';
import userReducer from './user/user';
import ordersReducer from './orders/orders';

const rootReducer = {
  app: appReducer,
  ingredients: ingredientsReducer,
  burgerIngredients: burderIngredientsReducer,
  order: orderReducer,
  orders: ordersReducer,
  user: userReducer,
};

export default rootReducer;
