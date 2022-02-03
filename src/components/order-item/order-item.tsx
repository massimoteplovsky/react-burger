import { FC } from 'react';
import cn from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './order-item.module.css';
import { IngredientType, OrderStatus } from '../../utils/constants';
import { TOrderPopulated } from '../../utils/prop-validator';
import { generateDate, getOrderStatus } from '../../utils/helpers';

type TComponentProps = {
  order: TOrderPopulated;
  isShownOrderStatus: boolean;
};

const TOTAL_INGREDIENTS = 7;

const OrderItem: FC<TComponentProps> = ({ order, isShownOrderStatus }) => {
  const { number, createdAt, name, status, ingredients, totalPrice } = order;

  return (
    <>
      <div className={s.orderInfo}>
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {generateDate(createdAt)}
        </span>
      </div>
      <h2
        className={cn(
          'text',
          'text_type_main-medium',
          isShownOrderStatus ? 'mb-2' : 'mb-6'
        )}
      >
        {name}
      </h2>
      {isShownOrderStatus && (
        <p
          className={cn(
            { [s.readyStatus]: status === OrderStatus.done },
            'text',
            'text_type_main-default',
            'mb-6'
          )}
        >
          {getOrderStatus(status)}
        </p>
      )}
      <div className={s.ingredientsBlock}>
        <div className={s.ingredientsList}>
          {ingredients
            .slice(0, TOTAL_INGREDIENTS)
            .map(({ _id, name, type, image_mobile, quantity }, index) => (
              <div
                key={`${_id}`}
                className={s.ingredient}
                style={{
                  zIndex: ingredients.length - index,
                }}
              >
                {quantity > 1 && type !== IngredientType.BUN && (
                  <span className={`${s.quantity} text text_type_main-default`}>
                    +{quantity}
                  </span>
                )}
                <img src={image_mobile} alt={name} />
              </div>
            ))}
          {ingredients.length > TOTAL_INGREDIENTS ? (
            <p
              className="text text_type_main-default"
              style={{ display: 'inline' }}
            >
              ...+{ingredients.length - TOTAL_INGREDIENTS}
            </p>
          ) : (
            ''
          )}
        </div>
        <span className={s.totalPrice}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </>
  );
};

export default OrderItem;
