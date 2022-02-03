export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  quantity?: number;
  __v: number;
};

export type TIngredients = Array<TIngredient>;

export type TApiOptions = {
  method: string;
  headers?: {
    ['Content-Type']?: string;
    Authorization?: string;
  };
  body?: string;
};

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrders = Array<TOrder>;

export type TOrderPopulated = Omit<TOrder, 'ingredients'> & {
  ingredients: TIngredients;
};

export type TOrdersPopulated = Array<TOrderPopulated>;

export type TOrderResponse = {
  success: boolean;
  orders: TOrder[];
  total?: number;
  totalToday?: number;
};
