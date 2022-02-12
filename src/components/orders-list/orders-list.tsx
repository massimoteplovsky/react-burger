import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import s from './orders-list.module.css';
import { TOrdersPopulated } from '../../utils/prop-validator';

// Components
import OrderItem from '../order-item/order-item';

type TComponentProps = {
  orders: TOrdersPopulated;
  isShownOrderStatus: boolean;
};

const OrdersList: FC<TComponentProps> = ({ orders, isShownOrderStatus }) => {
  const location = useLocation();
  return (
    <div className={s.container}>
      {orders.map((order) => (
        <Link
          key={order._id}
          to={{
            pathname: `${location.pathname}/${order.number}`,
            state: { modalLocation: location, currentOrder: order },
          }}
          className={s.orderLink}
        >
          <OrderItem
            key={order._id}
            order={order}
            isShownOrderStatus={isShownOrderStatus}
          />
        </Link>
      ))}
    </div>
  );
};

export default OrdersList;
