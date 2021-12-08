import { memo } from 'react';
import pt from 'prop-types';
import { PropValidator } from '../../utils/prop-validator';
import s from './main-ingredients-list.module.css';

// Components
import NoIngredient from '../no-ingredient/no-ingredient';
import MainIngredient from '../main-ingredient/main-ingredient';

const MainIngredientsList = ({ ingredients }) => {
  if (!ingredients.length)
    return <NoIngredient>Выберите основные ингредиенты</NoIngredient>;

  return (
    <ul className={`${s.ingredientsList}`}>
      {ingredients.map((ingredient, index) => (
        <MainIngredient
          key={`${ingredient._id}-${index}`}
          ingredient={ingredient}
          ingredientIndex={index}
        />
      ))}
    </ul>
  );
};

MainIngredientsList.propTypes = {
  ingredients: pt.arrayOf(PropValidator.INGREDIENT.isRequired).isRequired,
};

export default memo(MainIngredientsList);
