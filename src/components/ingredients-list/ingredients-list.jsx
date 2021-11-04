import pt from 'prop-types';
import { PropValidator } from '../../prop-validator';
import s from './ingredients-list.module.css';

// Components
import IngredientItem from '../ingredient-item/ingredient-item';

const IngredientsList = ({ ingredients, title }) => {
  return (
    <>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={`${s.ingredientList} pt-6 pr-4 pb-10 pl-4`}>
        {ingredients.map((ingredient) => (
          <IngredientItem key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </>
  );
};

IngredientsList.propTypes = {
  ingredients: pt.arrayOf(PropValidator.INGREDIENT),
};

export default IngredientsList;
