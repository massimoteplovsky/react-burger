import { memo } from 'react';
import pt from 'prop-types';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './submit-section.module.css';

const SubmitSection = ({ totalPrice, isDisabled, handleSendOrder }) => {
  return (
    <div className={s.submitSection}>
      <p className={`${s.totalPrice} text text_type_digits-medium mr-10`}>
        {totalPrice}&nbsp;
        <CurrencyIcon clasName="text_type_main-large" type="primary" />
      </p>
      <Button
        type="primary"
        size="large"
        disabled={isDisabled}
        onClick={handleSendOrder}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

SubmitSection.propTypes = {
  totalPrice: pt.number.isRequired,
  isDisabled: pt.bool.isRequired,
  handleSendOrder: pt.func.isRequired,
};

export default memo(SubmitSection);
