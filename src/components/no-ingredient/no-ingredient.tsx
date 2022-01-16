import { FC } from 'react';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import s from './no-ingredient.module.css';

const NoIngredient: FC = ({ children }) => {
  return (
    <p className={cn(s.text, 'text', 'text_type_main-default')}>
      <BurgerIcon type="primary" />
      {children}
    </p>
  );
};

export default NoIngredient;
