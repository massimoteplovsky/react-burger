import pt from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { PropValidator } from '../../utils/prop-validator';
import s from './ingredient-item.module.css';

const IngredientItem = ({ ingredient, handleClickIngredientItem }) => {
  const { name, image, price } = ingredient;

  const isVisible = Math.random() > 0.5;
  const randomIntFromInterval = (min = 1, max = 10) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <li
      className={s.ingredientItem}
      onClick={() => handleClickIngredientItem(ingredient)}
    >
      <img className={s.image} src={image} alt={name} />
      <p className={`${s.price} text text_type_digits-default mt-1 mb-1`}>
        {price}&nbsp;
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${s.name} text text_type_main-default`}>{name}</p>
      {isVisible && <Counter count={randomIntFromInterval()} size="default" />}
    </li>
  );
};

IngredientItem.propTypes = {
  ingredient: PropValidator.INGREDIENT.isRequired,
  handleClickIngredientItem: pt.func.isRequired,
};

export default IngredientItem;
