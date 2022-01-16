import { useState, FC } from 'react';
import s from './burger-ingredients.module.css';
import { IngredientType } from '../../utils/constants';

// Components
import IngredientsTabs from '../ingredients-tabs/ingredients-tabs';
import IngredientsListContainer from '../ingredients-list-container/ingredients-list-container';

const BurgerIngredients: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(IngredientType.BUN);
  const [isScrollMethod, setIsScrollMethod] = useState<boolean>(true);

  return (
    <section className={s.burgerIngredientsSection}>
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
  );
};

export default BurgerIngredients;
