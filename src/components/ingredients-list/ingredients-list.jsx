import { useCallback, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import pt from 'prop-types';
import { PropValidator } from '../../utils/prop-validator';
import s from './ingredients-list.module.css';
import { ModalType } from '../../utils/constants';
import { getBurgerIgredientsIdsCount } from '../../services/ducks/burger-ingredients';
import { setIngredient } from '../../services/ducks/ingredient';
import { openModal } from '../../services/ducks/app';

// Components
import IngredientItem from '../ingredient-item/ingredient-item';

const IngredientsList = forwardRef(({ title, ingredients }, ref) => {
  const burgerIngredientId = useSelector(getBurgerIgredientsIdsCount);
  const dispatch = useDispatch();

  const handleClickIngredientItem = useCallback(
    (ingredient) => {
      dispatch(setIngredient(ingredient));
      dispatch(openModal(ModalType.INGREDIENT));
    },
    [dispatch]
  );

  return (
    <>
      <h2 className="text text_type_main-medium" ref={ref}>
        {title}
      </h2>
      <ul className={`${s.ingredientList} pt-6 pr-4 pb-10 pl-4`}>
        {ingredients.map((ingredient) => (
          <IngredientItem
            key={ingredient._id}
            ingredient={ingredient}
            quantity={burgerIngredientId[ingredient._id] || 0}
            handleClickIngredientItem={handleClickIngredientItem}
          />
        ))}
      </ul>
    </>
  );
});

IngredientsList.propTypes = {
  title: pt.string.isRequired,
  ingredients: pt.arrayOf(PropValidator.INGREDIENT.isRequired).isRequired,
};

export default IngredientsList;
