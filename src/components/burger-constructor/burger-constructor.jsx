import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import s from './burger-constructor.module.css';
import {
  getBurgerIngredients,
  getTotalPrice,
  addIngredient,
} from '../../services/ducks/burger-ingredients';
import { sendOrder, getOrderState } from '../../services/ducks/order';
import { openModal } from '../../services/ducks/app';
import { BunPosition, ModalType } from '../../utils/constants';

// Components
import BunIngredient from '../bun-ingredient/bun-ingredient';
import MainIngredientsList from '../main-ingredients-list/main-ingredients-list';
import SubmitSection from '../submit-section/submit-section';
import NoIngredients from '../no-ingredients/no-ingredients';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      handleDrop(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const { bunIngredient, mainIngredients } = useSelector(getBurgerIngredients);
  const { isLoading } = useSelector(getOrderState);
  const totalPrice = useSelector(getTotalPrice);
  const isIngredientsExist = bunIngredient || mainIngredients.length > 0;

  const handleSendOrder = useCallback(async () => {
    const ingredientIds = [bunIngredient, ...mainIngredients].map(
      ({ _id }) => _id
    );
    await dispatch(sendOrder(ingredientIds));
    dispatch(openModal(ModalType.ORDER));
  }, [bunIngredient, mainIngredients, dispatch]);

  const handleDrop = useCallback(
    (ingredient) => {
      dispatch(addIngredient(ingredient));
    },
    [dispatch]
  );

  return (
    <section
      className={`${
        isHover ? s.hoverBurgerConstructorSection : s.burgerConstructorSection
      } mr-5 ml-5 mt-20`}
      ref={dropRef}
    >
      {!isIngredientsExist ? (
        <NoIngredients />
      ) : (
        <>
          <div className={`${s.ingredientsContainer} mt-5 mb-10`}>
            <BunIngredient
              ingredient={bunIngredient}
              position={BunPosition.TOP}
            />
            <MainIngredientsList ingredients={mainIngredients} />
            <BunIngredient
              ingredient={bunIngredient}
              position={BunPosition.BOTTOM}
            />
          </div>
          <SubmitSection
            totalPrice={totalPrice}
            isDisabled={!bunIngredient || isLoading}
            handleSendOrder={handleSendOrder}
          />
        </>
      )}
    </section>
  );
};

export default BurgerConstructor;
