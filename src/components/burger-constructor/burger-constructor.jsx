import { useMemo } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import pt from 'prop-types';
import s from './burger-constructor.module.css';
import { PropValidator } from '../../utils/prop-validator';

const BurgerConstructor = ({ ingredients, handleSetModalData }) => {
  const slicedIngredients = useMemo(() => ingredients.slice(0, 10), [
    ingredients,
  ]);
  const totalPrice = slicedIngredients.reduce(
    (total, ingredeint) => (total += ingredeint.price),
    0
  );

  const handleSendOrder = () => {
    handleSetModalData({ orderNumber: 345679 });
  };

  return (
    <section className={`${s.burgerConstructorSection} mr-5 ml-5 pt-25`}>
      <div className={`${s.ingredientsContainer} mb-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={slicedIngredients[0].name}
          price={slicedIngredients[0].price}
          thumbnail={slicedIngredients[0].image}
        />
        <ul className={`${s.ingredientsList} pr-4 pl-4`}>
          {useMemo(
            () =>
              slicedIngredients
                .slice(1, 9)
                .map(({ name, price, image }, index) => (
                  <li key={index} className={s.ingredientItem}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      isLocked={false}
                      text={name}
                      price={price}
                      thumbnail={image}
                    />
                  </li>
                )),
            [slicedIngredients]
          )}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={slicedIngredients[slicedIngredients.length - 1].name}
          price={slicedIngredients[slicedIngredients.length - 1].price}
          thumbnail={slicedIngredients[slicedIngredients.length - 1].image}
        />
      </div>
      <div className={`${s.submitSection} mr-6`}>
        <p className={`${s.totalPrice} text text_type_digits-medium mr-10`}>
          {totalPrice}&nbsp;
          <CurrencyIcon clasName="text_type_main-large" type="primary" />
        </p>
        <Button type="primary" size="large" onClick={handleSendOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: pt.arrayOf(PropValidator.INGREDIENT).isRequired,
  handleSetModalData: pt.func.isRequired,
};

export default BurgerConstructor;
