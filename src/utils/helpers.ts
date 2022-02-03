import { differenceInDays, format } from 'date-fns';
import { OrderStatus, Token } from './constants';

export const setToken = (name: string, value: string): void => {
  localStorage.setItem(name, value);
};

export const deleteToken = (name: string): void => {
  localStorage.removeItem(name);
};

export const getToken = (name: string): string => {
  return localStorage.getItem(name);
};

export const checkAuth = (): boolean => Boolean(getToken(Token.ACCESS_TOKEN));

export const chunk = (arr: number[], size: number): Array<number[]> => {
  const newArr = [];
  for (let i = 0; i < arr.length; i += size) {
    newArr.push(arr.slice(i, i + size));
  }
  return newArr;
};

export const getOrderStatus = (status: string): string => {
  switch (status) {
    case OrderStatus.created:
      return 'Создан';
    case OrderStatus.done:
      return 'Выполнен';
    case OrderStatus.pending:
      return 'Готовится';
    default:
      return 'Отменен';
  }
};

export const declOfNum = (number: number, textForms: string[]): string => {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return textForms[2];
  if (n1 > 1 && n1 < 5) return textForms[1];
  if (n1 === 1) return textForms[0];
  return textForms[2];
};

export const generateDate = (date: string): string => {
  const diffInDays = differenceInDays(new Date(), new Date(date));

  let day;
  if (diffInDays === 0) day = 'Сегодня';
  if (diffInDays === 1) day = 'Вчера';
  if (diffInDays > 1)
    day = `${diffInDays} ${declOfNum(diffInDays, [
      'день',
      'дня',
      'дней',
    ])} назад`;

  return `${day}, ${format(new Date(date), 'HH:mm')} i-GMT+3`;
};
