import { memo, useEffect, useRef, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { TIngredient } from '../../utils/prop-validator';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import s from './main-ingredient.module.css';
import {
  removeIngredient,
  sortMainIngredients,
} from '../../services/ducks/burger-ingredients';

type TComponentProps = {
  ingredient: TIngredient;
  ingredientIndex: number;
};

const MainIngredient: FC<TComponentProps> = ({
  ingredient,
  ingredientIndex,
}) => {
  const dispatch = useDispatch();
  const dragDropRef = useRef<HTMLLIElement>(null);
  const { name, price, image_mobile } = ingredient;

  const [{ isDrag, draggingItem }, dragRef] = useDrag({
    type: 'main-ingredient',
    item: { draggingItemIndex: ingredientIndex },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
      draggingItem: monitor.getItem(),
    }),
  });

  const [{ isHover }, dropRef] = useDrop({
    accept: 'main-ingredient',
    drop() {
      dispatch(
        sortMainIngredients({
          startIndex: draggingItem.draggingItemIndex,
          moveToIndex: ingredientIndex,
        })
      );
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const isHoveredSameIngredient =
    draggingItem?.draggingItemIndex === ingredientIndex;

  useEffect(() => {
    dragRef(dropRef(dragDropRef));
  }, [dragRef, dropRef]);

  const handleDeleteIngredient = (ingredientIndex: number): void => {
    dispatch(removeIngredient(ingredientIndex));
  };

  return (
    <li
      className={cn(s.ingredientItem, {
        [s.ingredientItemDragging]: isDrag,
        [s.ingredientItemHovered]: isHover && !isHoveredSameIngredient,
      })}
      ref={dragDropRef}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image_mobile}
        handleClose={() => handleDeleteIngredient(ingredientIndex)}
      />
    </li>
  );
};

export default memo(MainIngredient);
