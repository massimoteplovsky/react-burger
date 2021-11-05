import { useState } from 'react';
import pt from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredients.module.css';
import { PropValidator } from '../../prop-validator';

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

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState(IngredientType.BUN);

  const filteredIngredients = data.reduce((acc, ingredient) => {
    const { type } = ingredient;
    if (!acc[type]) {
      acc[type] = [ingredient];
      return acc;
    }

    acc[type].push(ingredient);
    return acc;
  }, {});

  return (
    <section className={`${s.burgerIngredientsSection} mr-5 ml-5 pt-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={`${s.tabsBlock} mb-10`}>
        {tabItems.map(({ name, type }) => (
          <Tab
            key={type}
            value={name}
            active={current === type}
            onClick={() => setCurrent(type)}
          >
            {name}
          </Tab>
        ))}
      </div>
      <div className={s.ingredientsContainer}>
        {tabItems.map(({ name, type }) => (
          <IngredientsList
            key={type}
            title={name}
            ingredients={filteredIngredients[type]}
          />
        ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: pt.arrayOf(PropValidator.INGREDIENT).isRequired,
};

export default BurgerIngredients;
