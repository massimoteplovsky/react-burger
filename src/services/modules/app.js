// Action types
export const FETCH_INGREDIENTS = 'FETCH_INGREDIENTS';
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';
export const SEND_ORDER_ERROR = 'SEND_ORDER_ERROR';
export const ADD_BUN_INGREDIENT = 'ADD_BUN_INGREDIENT';
export const ADD_MAIN_INGREDIENT = 'ADD_MAIN_INGREDIENT';
export const SET_INGREDIENT = 'SET_INGREDIENT';
export const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CLOSE_MODAL = 'CLOSE_MODAL';

// Reducer
const appReducer = (state, { type, payload = null }) => {
  switch (type) {
    case 'FETCH_INGREDIENTS':
      return {
        ...state,
        ingredients: payload,
        loading: false,
      };
    case 'FETCH_INGREDIENTS_ERROR':
    case 'SEND_ORDER_ERROR':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'ADD_BUN_INGREDIENT':
      return {
        ...state,
        burgerData: {
          ...state.burgerData,
          bunIngredient: payload,
        },
      };
    case 'ADD_MAIN_INGREDIENT':
      return {
        ...state,
        burgerData: {
          ...state.burgerData,
          mainIngredients: [...state.burgerData.mainIngredients, payload],
        },
      };
    case 'SET_INGREDIENT':
      return {
        ...state,
        ingredient: payload.ingredient,
        modalType: payload.modalType,
      };
    case 'SET_ORDER_NUMBER':
      return {
        ...state,
        orderNumber: payload.orderNumber,
        modalType: payload.modalType,
      };
    case 'SET_TOTAL_PRICE':
      return {
        ...state,
        totalPrice: payload,
      };
    case 'DELETE_INGREDIENT':
      return {
        ...state,
        burgerData: {
          ...state.burgerData,
          mainIngredients: payload,
        },
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalType: null,
      };
    default:
      return state;
  }
};

export default appReducer;
