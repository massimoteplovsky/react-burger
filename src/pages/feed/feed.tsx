import { ReactNode, useEffect, FC } from 'react';
import cn from 'classnames';
import s from './feed.module.css';
import {
  getFilteredOrders,
  getAllOrders,
} from '../../services/ducks/orders/orders';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { OrderStatus } from '../../utils/constants';
import { wsAction } from '../../services/ducks/orders/orders';

// Components
import OrderList from '../../components/orders-list/orders-list';
import Loader from '../../components/loader/loader';

const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const ordersData = useAppSelector(getAllOrders);
  const filteredOrders = useAppSelector(getFilteredOrders);

  useEffect(() => {
    dispatch(wsAction.wsInitAllOrders());
    return () => {
      dispatch(wsAction.onClose());
    };
  }, [dispatch]);

  if (!ordersData) return <Loader />;

  const { orders, total, totalToday } = ordersData;

  const renderStatusBlock = (title: string, status: string): ReactNode => {
    return (
      <div
        className={cn(
          s.statusBlock,
          status === OrderStatus.done ? 'pr-5' : 'pl-5'
        )}
      >
        <h2 className="text text_type_main-medium mb-6">{title}:</h2>
        <div className={s.orders}>
          {filteredOrders[status]
            ?.slice(0, 3)
            .map((chunk: number[], index: number) => {
              return (
                <ul key={index}>
                  {chunk.map((number) => (
                    <li
                      key={number}
                      className="text text_type_digits-default mb-2"
                      style={{
                        color:
                          status === OrderStatus.done ? '#00cccc' : '#F2F2F3',
                      }}
                    >
                      {number}
                    </li>
                  ))}
                </ul>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div className={s.container}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={s.content}>
        <OrderList orders={orders} isShownOrderStatus={false} />
        <section className={s.dashboard}>
          <div className={s.statusContainer}>
            {renderStatusBlock('Готовы', OrderStatus.done)}
            {renderStatusBlock('В работе', OrderStatus.pending)}
          </div>
          <h2 className="text text_type_main-medium">
            Выполнено за все время:
          </h2>
          <p className="text text_type_digits-large mb-15">{total}</p>
          <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
          <p className="text text_type_digits-large">{totalToday}</p>
        </section>
      </div>
    </div>
  );
};

export default Feed;
