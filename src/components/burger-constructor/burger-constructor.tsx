import { useCallback, FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import cn from 'classnames';
import s from './burger-constructor.module.css';
import {
  getBurgerIngredients,
  getTotalPrice,
  addIngredient,
  resetBurgerIngredients,
} from '../../services/ducks/burger-ingredients';
import {
  sendOrder,
  resetOrder,
  getOrderState,
} from '../../services/ducks/order';
import { BunPosition, RoutePath } from '../../utils/constants';

// Components
import BunIngredient from '../bun-ingredient/bun-ingredient';
import MainIngredientsList from '../main-ingredients-list/main-ingredients-list';
import SubmitSection from '../submit-section/submit-section';
import NoIngredients from '../no-ingredients/no-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { checkAuth } from '../../utils/helpers';

const BurgerConstructor: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAuth = checkAuth();
  const { bunIngredient, mainIngredients } =
    useAppSelector(getBurgerIngredients);
  const { orderNumber, isLoading } = useAppSelector(getOrderState);
  const totalPrice = useAppSelector(getTotalPrice);
  const isIngredientsExist = bunIngredient || mainIngredients.length > 0;
  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      handleDrop(ingredient);
    },
    canDrop() {
      return !isLoading;
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleSendOrder = useCallback(async () => {
    if (!isAuth) {
      return history.push({ pathname: RoutePath.LOGIN });
    }

    const ingredientsIds = [bunIngredient, ...mainIngredients].map(
      ({ _id }) => _id
    );
    await dispatch(sendOrder(ingredientsIds));
  }, [bunIngredient, mainIngredients, isAuth, dispatch, history]);

  const handleDrop = useCallback(
    (ingredient) => {
      dispatch(addIngredient(ingredient));
    },
    [dispatch]
  );

  const handleCloseModal = useCallback(() => {
    dispatch(resetOrder());
    dispatch(resetBurgerIngredients());
  }, [dispatch]);

  return (
    <section
      className={cn(s.burgerConstructorSection, {
        [s.hoverBurgerConstructorSection]: isHover,
      })}
      ref={dropRef}
    >
      {!isIngredientsExist ? (
        <NoIngredients />
      ) : (
        <>
          <div className={s.ingredientsContainer}>
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
            isDisabled={!bunIngredient}
            handleSendOrder={handleSendOrder}
          />
          {orderNumber && (
            <Modal isTitled={false} handleCloseModal={handleCloseModal}>
              <OrderDetails orderNumber={orderNumber} />
            </Modal>
          )}
        </>
      )}
      {isLoading && (
        <div className={cn(s.orderSending, 'text', 'text_type_main-large')}>
          Заказ отправляется...
        </div>
      )}
    </section>
  );
};

export default BurgerConstructor;
