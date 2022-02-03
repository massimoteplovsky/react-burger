import { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import s from './order.module.css';
import {
  fetchCurrentOrder,
  getOrder,
  getOrdersState,
} from '../../services/ducks/orders';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

// Components
import OrderInfo from '../../components/order-info/order-info';
import Loader from '../../components/loader/loader';

type TParams = {
  id: string;
};

const Order: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<TParams>();
  const { isLoading } = useAppSelector(getOrdersState);
  const order = useAppSelector(getOrder);

  useEffect(() => {
    const fetchOrder = async () => {
      await dispatch(fetchCurrentOrder(id));
    };
    fetchOrder();
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (!order)
    return (
      <div className={s.orderContainer}>
        <h2 className="text text_type_main-large">Заказ не найден</h2>
      </div>
    );

  return (
    <div className={s.orderContainer}>
      <h2
        className={cn(
          s.orderNumber,
          'text',
          'text_type_digits-default',
          'mb-10'
        )}
      >
        #{order.number}
      </h2>
      <OrderInfo order={order} />
    </div>
  );
};

export default Order;
