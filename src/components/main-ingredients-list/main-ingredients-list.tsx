import { memo, FC } from 'react';
import { TIngredients } from '../../utils/prop-validator';
import s from './main-ingredients-list.module.css';

// Components
import NoIngredient from '../no-ingredient/no-ingredient';
import MainIngredient from '../main-ingredient/main-ingredient';

type TComponentProps = {
  ingredients: TIngredients;
};

const MainIngredientsList: FC<TComponentProps> = ({ ingredients }) => {
  if (!ingredients.length)
    return <NoIngredient>Выберите основные ингредиенты</NoIngredient>;

  return (
    <ul className={s.ingredientsList}>
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

export default memo(MainIngredientsList);
