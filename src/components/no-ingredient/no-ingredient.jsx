import pt from 'prop-types';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './no-ingredient.module.css';

const NoIngredient = ({ children }) => {
  return (
    <p className={`${s.text} text text_type_main-default`}>
      <BurgerIcon />
      {children}
    </p>
  );
};

NoIngredient.propTypes = {
  children: pt.node.isRequired,
};

export default NoIngredient;
