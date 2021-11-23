import { useState, useCallback, useMemo, useContext, memo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredients.module.css';
import { AppContext } from '../../services/app-context';
import { ModalType } from '../../utils/constants';
import {
  SET_INGREDIENT,
  ADD_BUN_INGREDIENT,
  ADD_MAIN_INGREDIENT,
} from '../../services/modules/app';

// Components
import IngredientsList from '../ingredients-list/ingredients-list';

const IngredientType = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
};

const tabItems = [
  {
    name: 'Булки',
    type: IngredientType.BUN,
  },
  {
    name: 'Соусы',
    type: IngredientType.SAUCE,
  },
  {
    name: 'Начинки',
    type: IngredientType.MAIN,
  },
];

const BurgerIngredients = () => {
  const [current, setCurrent] = useState(IngredientType.BUN);
  const {
    ingredients,
    burgerData: { bunIngredient, mainIngredients },
    dispatch,
  } = useContext(AppContext);

  const burgerIngredients = useMemo(
    () =>
      bunIngredient
        ? [bunIngredient, ...mainIngredients]
        : [...mainIngredients],
    [bunIngredient, mainIngredients]
  );

  const filteredIngredients = useMemo(
    () =>
      ingredients.reduce((acc, ingredient) => {
        const { type } = ingredient;
        if (!acc[type]) {
          acc[type] = [ingredient];
          return acc;
        }

        acc[type].push(ingredient);
        return acc;
      }, {}),
    [ingredients]
  );

  const handleClickIngredientItem = useCallback(
    (ingredient) => {
      dispatch({
        type: SET_INGREDIENT,
        payload: { ingredient, modalType: ModalType.INGREDIENT },
      });

      if (ingredient.type === IngredientType.BUN) {
        return dispatch({ type: ADD_BUN_INGREDIENT, payload: ingredient });
      }

      dispatch({ type: ADD_MAIN_INGREDIENT, payload: ingredient });
    },
    [dispatch]
  );

  return (
    <section className={`${s.burgerIngredientsSection} mr-5 ml-5 pt-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={`${s.tabsBlock} mb-10`}>
        {useMemo(
          () =>
            tabItems.map(({ name, type }) => (
              <Tab
                key={type}
                value={name}
                active={current === type}
                onClick={() => setCurrent(type)}
              >
                {name}
              </Tab>
            )),
          [current]
        )}
      </div>
      <div className={s.ingredientsContainer}>
        {tabItems.map(({ name, type }) => (
          <IngredientsList
            key={type}
            title={name}
            ingredients={filteredIngredients[type]}
            burgerIngredients={burgerIngredients}
            handleClickIngredientItem={handleClickIngredientItem}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(BurgerIngredients);
