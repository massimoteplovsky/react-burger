import { FC } from 'react';
import cn from 'classnames';
import s from './order-info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderStatus } from '../../utils/constants';
import { generateDate, getOrderStatus } from '../../utils/helpers';
import { TOrderPopulated } from '../../utils/prop-validator';

type TComponentProps = {
  order: TOrderPopulated;
};

const OrderInfo: FC<TComponentProps> = ({ order }) => {
  const { createdAt, name, status, ingredients, totalPrice } = order;

  return (
    <div className={s.container}>
      <section className={s.orderBlock}>
        <h2 className="text text_type_main-medium mb-3">{name}</h2>
        <p
          className={cn(
            { [s.readyStatus]: status === OrderStatus.done },
            'text',
            'text_type_main-default',
            'mb-15'
          )}
        >
          {getOrderStatus(status)}
        </p>
        <div className={s.ingredientsBlock}>
          <h2 className="text text_type_main-medium mb-6">Состав:</h2>
          <div
            className={cn(s.ingredientsList, {
              'pr-6': ingredients.length > 4,
            })}
          >
            {ingredients.map(({ _id, name, image_mobile, price, quantity }) => (
              <div key={_id} className={s.ingredient}>
                <div className={s.image}>
                  <img src={image_mobile} alt={name} />
                </div>
                <p className={`${s.name} text text_type_main-default`}>
                  {name}
                </p>
                <p className={`${s.quantity} text text_type_digits-default`}>
                  {quantity} x {price} <CurrencyIcon type="primary" />
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={s.orderInfo}>
          <span className="text text_type_main-default text_color_inactive">
            {generateDate(createdAt)}
          </span>
          <span className={s.totalPrice}>
            <span className="text text_type_digits-default">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </section>
    </div>
  );
};

export default OrderInfo;
