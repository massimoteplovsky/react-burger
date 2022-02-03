import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import s from './orders-list.module.css';
import { TOrdersPopulated } from '../../utils/prop-validator';

// Components
import OrderItem from '../order-item/order-item';
import { RoutePath } from '../../utils/constants';

type TComponentProps = {
  orders: TOrdersPopulated;
  isShownOrderStatus: boolean;
  isModal?: boolean;
};

const OrdersList: FC<TComponentProps> = ({
  orders,
  isShownOrderStatus,
  isModal = true,
}) => {
  const location = useLocation();
  return (
    <div className={s.container}>
      {orders.map((order) => (
        <Link
          key={order._id}
          to={{
            pathname: `${
              location.pathname.includes(RoutePath.FEED)
                ? RoutePath.FEED
                : RoutePath.PROFILE_ORDERS
            }/${order.number}`,
            state: isModal
              ? { modalLocation: location, currentOrder: order }
              : null,
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
