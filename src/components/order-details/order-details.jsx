import pt from 'prop-types';
import OrderAccepted from '../../images/done.gif';
import s from './order-details.module.css';

const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={s.container}>
      <h2 className="text text_type_digits-large mb-8">{orderNumber}</h2>
      <p className="text text_type_main-medium">Идентификатор заказа</p>
      <img className="mt-15 mb-15" src={OrderAccepted} alt="Заказ принят" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderNumber: pt.number.isRequired,
};

export default OrderDetails;
