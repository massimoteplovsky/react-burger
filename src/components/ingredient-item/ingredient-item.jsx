import { memo } from 'react';
import pt from 'prop-types';
import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { PropValidator } from '../../utils/prop-validator';
import s from './ingredient-item.module.css';

const IngredientItem = ({
  ingredient,
  quantity,
  handleClickIngredientItem,
}) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const { name, image, price } = ingredient;

  return (
    <li
      ref={dragRef}
      className={isDrag ? s.draggableIngredientItem : s.ingredientItem}
      onClick={() => handleClickIngredientItem(ingredient)}
    >
      <img className={s.image} src={image} alt={name} />
      <p className={`${s.price} text text_type_digits-default mt-1 mb-1`}>
        {price}&nbsp;
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${s.name} text text_type_main-default`}>{name}</p>
      {quantity > 0 && <Counter count={quantity} size="default" />}
    </li>
  );
};

IngredientItem.propTypes = {
  ingredient: PropValidator.INGREDIENT.isRequired,
  quantity: pt.number.isRequired,
  handleClickIngredientItem: pt.func.isRequired,
};

export default memo(IngredientItem);
