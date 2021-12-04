export const ModalType = {
  INGREDIENT: 'ingredient',
  ORDER: 'order',
};

export const ApiRoute = {
  INGREDIENTS: 'ingredients',
  ORDERS: 'orders',
};

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
  INGREDIENTS: 'app/ingredients',
  INGREDIENT: 'app/ingredient',
  BURGER_INGREDIENTS: 'app/burgerIngredients',
};
