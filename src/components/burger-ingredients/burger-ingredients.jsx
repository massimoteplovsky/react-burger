import { useState } from 'react';
import s from './burger-ingredients.module.css';
import { IngredientType } from '../../utils/constants';

// Components
import IngredientsTabs from '../ingredients-tabs/ingredients-tabs';
import IngredientsListContainer from '../ingredients-list-container/ingredients-list-container';

const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState(IngredientType.BUN);
  const [isScrollMethod, setIsScrollMethod] = useState(true);

  return (
    <>
      <section className={`${s.burgerIngredientsSection} mr-5 ml-5`}>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <IngredientsTabs
          activeTab={activeTab}
          setIsScrollMethod={setIsScrollMethod}
          setActiveTab={setActiveTab}
        />
        <IngredientsListContainer
          activeTab={activeTab}
          isScrollMethod={isScrollMethod}
          setIsScrollMethod={setIsScrollMethod}
          setActiveTab={setActiveTab}
        />
      </section>
    </>
  );
};

export default BurgerIngredients;
