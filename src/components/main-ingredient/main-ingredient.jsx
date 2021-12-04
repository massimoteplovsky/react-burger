import { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import pt from 'prop-types';
import { PropValidator } from '../../utils/prop-validator';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './main-ingredient.module.css';
import {
  removeIngredient,
  sortMainIngredients,
} from '../../services/ducks/burger-ingredients';

const MainIngredient = ({ ingredient, ingredientIndex }) => {
  const dispatch = useDispatch();
  const dragDropRef = useRef(null);
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
    dragRef(dragDropRef);
    dropRef(dragDropRef);
  }, [dragRef, dropRef]);

  const handleDeleteIngredient = (ingredientIndex) => {
    dispatch(removeIngredient(ingredientIndex));
  };

  return (
    <li
      className={`${s.ingredientItem} ${
        isDrag ? s.ingredientItemDragging : ''
      } ${isHover && !isHoveredSameIngredient ? s.ingredientItemHovered : ''}`}
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

MainIngredient.propTypes = {
  ingredient: PropValidator.INGREDIENT.isRequired,
  ingredientIndex: pt.number.isRequired,
};

export default memo(MainIngredient);
