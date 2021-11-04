import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import pt from 'prop-types';
import s from './burger-constructor.module.css';
import { PropValidator } from '../../prop-validator';

const BurgerConstructor = ({ data }) => {
  const ingredients = data.slice(0, 10);
  const totalPrice = ingredients.reduce(
    (total, ingredeint) => (total += ingredeint.price),
    0
  );

  return (
    <section className={`${s.burgerConstructorSection} mr-5 ml-5 pt-25`}>
      <div className={`${s.ingredientsContainer} mb-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={ingredients[0].name}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
        />
        <ul className={`${s.ingredientsList} pr-4 pl-4`}>
          {ingredients.slice(1, 9).map(({ name, price, image }, index) => (
            <li key={index} className={s.ingredientItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={name}
                price={price}
                thumbnail={image}
              />
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={ingredients[ingredients.length - 1].name}
          price={ingredients[ingredients.length - 1].price}
          thumbnail={ingredients[ingredients.length - 1].image}
        />
      </div>
      <div className={`${s.submitSection} mr-6`}>
        <p className={`${s.totalPrice} text text_type_digits-medium mr-10`}>
          {totalPrice}&nbsp;
          <CurrencyIcon clasName="text_type_main-large" type="primary" />
        </p>
        <Button type="primary" size="large" onClick={() => {}}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: pt.arrayOf(PropValidator.INGREDIENT).isRequired,
};

export default BurgerConstructor;
