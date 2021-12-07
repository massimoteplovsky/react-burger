import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './burger-ingredients.module.css';
import { IngredientType } from '../../utils/constants';
import {
  getCurrentIngredient,
  setCurrentIngredient,
} from '../../services/ducks/current-ingredient';

// Components
import IngredientsTabs from '../ingredients-tabs/ingredients-tabs';
import IngredientsListContainer from '../ingredients-list-container/ingredients-list-container';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const currentIngredient = useSelector(getCurrentIngredient);
  const [activeTab, setActiveTab] = useState(IngredientType.BUN);
  const [isScrollMethod, setIsScrollMethod] = useState(false);

  const handleCloseModal = useCallback(() => {
    dispatch(setCurrentIngredient(null));
  }, [dispatch]);

  return (
    <>
      <section className={`${s.burgerIngredientsSection} mr-5 ml-5 pt-10`}>
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
      {currentIngredient && (
        <Modal isTitled handleCloseModal={handleCloseModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
