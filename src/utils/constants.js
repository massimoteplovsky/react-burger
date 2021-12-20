export const ApiRoute = {
  INGREDIENTS: 'ingredients',
  ORDERS: 'orders',
  AUTH_REGISTRATION: 'auth/register',
  AUTH_LOGIN: 'auth/login',
  AUTH_LOGOUT: 'auth/logout',
  AUTH_TOKEN: 'auth/token',
  AUTH_USER: 'auth/user',
  PASSWORD_RESET: 'password-reset',
  PASSWORD_RESET_RESET: 'password-reset/reset',
};

export const Token = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

export const TOKEN_ERROR_TYPES = ['jwt expired', 'invalid token'];

export const BunPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

export const IngredientType = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
};

export const TAB_ITEMS = [
  {
    name: 'Булки',
    type: IngredientType.BUN,
  },
  {
    name: 'Соусы',
    type: IngredientType.SAUCE,
  },
  {
    name: 'Начинки',
    type: IngredientType.MAIN,
  },
];

export const ActionPrefix = {
  APP: 'app',
  ORDER: 'app/order',
  USER: 'app/user',
  INGREDIENTS: 'app/ingredients',
  CURRENT_INGREDIENT: 'app/currentIngredient',
  BURGER_INGREDIENTS: 'app/burgerIngredients',
};

export const RoutePath = {
  HOME: '/',
  LOGIN: '/login',
  REGISTRATION: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  INGREDIENT: (id) => `/ingredients/${id}`,
};
