import { memo } from 'react';
import pt from 'prop-types';
import { PropValidator } from '../../utils/prop-validator';
import s from './ingredients-list.module.css';

// Components
import IngredientItem from '../ingredient-item/ingredient-item';

const IngredientsList = ({
  title,
  ingredients,
  burgerIngredients,
  handleClickIngredientItem,
}) => {
  const countIngredients = (id) =>
    burgerIngredients.filter((ingredient) => ingredient._id === id).length;

  return (
    <>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={`${s.ingredientList} pt-6 pr-4 pb-10 pl-4`}>
        {ingredients.map((ingredient) => (
          <IngredientItem
            key={ingredient._id}
            ingredient={ingredient}
            quantity={countIngredients(ingredient._id)}
            handleClickIngredientItem={handleClickIngredientItem}
          />
        ))}
      </ul>
    </>
  );
};

IngredientsList.propTypes = {
  title: pt.string.isRequired,
  ingredients: pt.arrayOf(PropValidator.INGREDIENT.isRequired).isRequired,
  burgerIngredients: pt.arrayOf(PropValidator.INGREDIENT).isRequired,
  handleClickIngredientItem: pt.func.isRequired,
};

export default memo(IngredientsList);
