import { memo, FC } from 'react';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './no-ingredients.module.css';

const NoIngredients: FC = () => {
  return (
    <div className={s.noIngredientsBlock}>
      <BurgerIcon type="primary" />
      <h2 className="text text_type_main-large mb-3">Собери свой бургер</h2>
      <p className="text text_type_main-medium">
        Перенесите ингредиенты в конструктор
      </p>
    </div>
  );
};

export default memo(NoIngredients);
