import { useContext, useEffect } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  BurgerIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.css';
import { AppContext } from '../../services/app-context';
import { ENDPOINT, ApiRoute, ModalType } from '../../utils/constants';
import {
  SET_ORDER_NUMBER,
  SEND_ORDER_ERROR,
  DELETE_INGREDIENT,
  SET_TOTAL_PRICE,
} from '../../services/modules/app';

// Components
import NoIngredient from '../no-ingredient/no-ingredient';

const BurgerConstructor = () => {
  const {
    burgerData: { bunIngredient, mainIngredients },
    totalPrice,
    dispatch,
  } = useContext(AppContext);
  const isIngredientsExist = bunIngredient || mainIngredients.length > 0;

  const handleSendOrder = async () => {
    const ingredients = [bunIngredient, ...mainIngredients].map(
      ({ _id }) => _id
    );

    try {
      const response = await fetch(`${ENDPOINT}/${ApiRoute.ORDERS}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      if (response?.ok) {
        const { order } = await response.json();
        return dispatch({
          type: SET_ORDER_NUMBER,
          payload: { orderNumber: order.number, modalType: ModalType.ORDER },
        });
      }

      throw new Error();
    } catch (err) {
      dispatch({
        type: SEND_ORDER_ERROR,
      });
    }
  };

  const handleDeleteIngredient = (ingredientIndex) => {
    const newMainIngredients = mainIngredients.filter(
      (_, index) => index !== ingredientIndex
    );
    dispatch({ type: DELETE_INGREDIENT, payload: newMainIngredients });
  };

  useEffect(() => {
    const bunPrice = bunIngredient?.price * 2 || 0;

    const totalPrice =
      mainIngredients.reduce(
        (totalPrice, { price }) => (totalPrice += price),
        0
      ) + bunPrice;

    dispatch({
      type: SET_TOTAL_PRICE,
      payload: totalPrice,
    });
  }, [bunIngredient, mainIngredients, dispatch]);

  return (
    <section className={`${s.burgerConstructorSection} mr-5 ml-5 pt-25`}>
      {!isIngredientsExist ? (
        <div className={s.noIngredientsBlock}>
          <BurgerIcon type="primary" />
          <h2 className="text text_type_main-medium">
            Выберите ингредиенты для вашего бургера
          </h2>
        </div>
      ) : (
        <>
          <div className={`${s.ingredientsContainer} mb-10`}>
            {bunIngredient ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bunIngredient.name} (верх)`}
                price={bunIngredient.price}
                thumbnail={bunIngredient.image_mobile}
              />
            ) : (
              <NoIngredient>Выберите булку (верх)</NoIngredient>
            )}
            <ul className={`${s.ingredientsList}`}>
              {mainIngredients.length ? (
                mainIngredients.map(({ name, price, image_mobile }, index) => (
                  <li key={index} className={s.ingredientItem}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      isLocked={false}
                      text={name}
                      price={price}
                      thumbnail={image_mobile}
                      handleClose={() => handleDeleteIngredient(index)}
                    />
                  </li>
                ))
              ) : (
                <NoIngredient>Выберите основные ингредиенты</NoIngredient>
              )}
            </ul>
            {bunIngredient ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bunIngredient.name} (низ)`}
                price={bunIngredient.price}
                thumbnail={bunIngredient.image_mobile}
              />
            ) : (
              <NoIngredient>Выберите булку (низ)</NoIngredient>
            )}
          </div>
          <div className={s.submitSection}>
            <p className={`${s.totalPrice} text text_type_digits-medium mr-10`}>
              {totalPrice}&nbsp;
              <CurrencyIcon clasName="text_type_main-large" type="primary" />
            </p>
            <Button
              type="primary"
              size="large"
              disabled={!bunIngredient}
              onClick={handleSendOrder}
            >
              Оформить заказ
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default BurgerConstructor;
