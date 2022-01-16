import { useCallback, forwardRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TIngredients } from '../../utils/prop-validator';
import s from './ingredients-list.module.css';
import { getBurgerIgredientsIdsCount } from '../../services/ducks/burger-ingredients';
import { RoutePath } from '../../utils/constants';

// Components
import IngredientItem from '../ingredient-item/ingredient-item';

type TComponentProps = {
  title: string;
  ingredients: TIngredients;
};

const IngredientsList = forwardRef<HTMLHeadingElement, TComponentProps>(
  ({ title, ingredients }, ref) => {
    const history = useHistory();
    const location = useLocation();
    const burgerIngredientId = useSelector(getBurgerIgredientsIdsCount);

    const handleClickIngredientItem = useCallback(
      (ingredient) => {
        history.push({
          pathname: RoutePath.INGREDIENT(ingredient._id),
          state: { modalLocation: location, currentIngredient: ingredient },
        });
      },
      [history, location]
    );

    return (
      <>
        <h2 className="text text_type_main-medium" ref={ref}>
          {title}
        </h2>
        <ul className={s.ingredientList}>
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
  }
);

export default IngredientsList;
