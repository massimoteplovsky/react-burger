import { memo, FC } from 'react';
import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { TIngredient } from '../../utils/prop-validator';
import s from './ingredient-item.module.css';

type TCopmonentProps = {
  ingredient: TIngredient;
  quantity: number;
  handleClickIngredientItem: (ingredient: TIngredient) => void;
};

const IngredientItem: FC<TCopmonentProps> = ({
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
      className={cn(s.ingredientItem, { [s.draggableIngredientItem]: isDrag })}
      onClick={() => handleClickIngredientItem(ingredient)}
    >
      <img className={s.image} src={image} alt={name} />
      <p className={cn(s.price, 'text', 'text_type_digits-default')}>
        {price}&nbsp;
        <CurrencyIcon type="primary" />
      </p>
      <p className={cn(s.name, 'text', 'text_type_main-default')}>{name}</p>
      {quantity > 0 && <Counter count={quantity} size="default" />}
    </li>
  );
};

export default memo(IngredientItem);
