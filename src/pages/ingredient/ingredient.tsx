import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import s from './ingredient.module.css';
import {
  getIngredient,
  getIngredientsState,
} from '../../services/ducks/ingredients';
import { RoutePath } from '../../utils/constants';
import { TIngredient } from '../../utils/prop-validator';

// Components
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

type TProps = {
  id: string;
};

const Ingredient: FC = () => {
  const { id } = useParams<TProps>();
  const { ingredientsList } = useSelector(getIngredientsState);
  const currentIngredient = useSelector(getIngredient(id));

  if (!currentIngredient) {
    return (
      <div className={s.container}>
        <h1 className="text text_type_main-large mb-8">
          Ингредиент не найден!
        </h1>
        <p className="text text_type_main-medium mb-10">
          Посмотрите весь наш список ингредиентов:
        </p>
        <div className={s.ingredientsList}>
          {ingredientsList.map(({ _id, name, image }: TIngredient) => (
            <Link
              to={{ pathname: RoutePath.INGREDIENT(_id) }}
              className={s.ingredientItem}
              key={_id}
            >
              <img src={image} alt={name} />
              <p className="text text_type_main-small">{name}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={s.ingredientContainer}>
      <h2 className={cn(s.title, 'text', 'text_type_main-large')}>
        Детали ингредиента
      </h2>
      <IngredientDetails ingredient={currentIngredient} />
    </div>
  );
};

export default Ingredient;
