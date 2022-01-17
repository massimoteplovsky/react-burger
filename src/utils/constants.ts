export enum ApiRoute {
  INGREDIENTS = 'ingredients',
  ORDERS = 'orders',
  AUTH_REGISTRATION = 'auth/register',
  AUTH_LOGIN = 'auth/login',
  AUTH_LOGOUT = 'auth/logout',
  AUTH_TOKEN = 'auth/token',
  AUTH_USER = 'auth/user',
  PASSWORD_RESET = 'password-reset',
  PASSWORD_RESET_RESET = 'password-reset/reset',
}

export enum Token {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export const TOKEN_ERROR_TYPES = ['jwt expired', 'invalid token'];

export enum BunPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum IngredientType {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
}

export const TAB_ITEMS = [
  {
    name: 'Булки',
    type: 'bun',
  },
  {
    name: 'Соусы',
    type: 'sauce',
  },
  {
    name: 'Начинки',
    type: 'main',
  },
];

export enum ActionPrefix {
  APP = 'app',
  ORDER = 'app/order',
  USER = 'app/user',
  INGREDIENTS = 'app/ingredients',
  CURRENT_INGREDIENT = 'app/currentIngredient',
  BURGER_INGREDIENTS = 'app/burgerIngredients',
}

export const RoutePath = {
  HOME: '/',
  LOGIN: '/login',
  REGISTRATION: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  INGREDIENT: (id: string): string => `/ingredients/${id}`,
};
