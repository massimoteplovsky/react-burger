import { memo, FC } from 'react';
import pt from 'prop-types';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import s from './submit-section.module.css';

type TComponentProps = {
  totalPrice: number;
  isDisabled: boolean;
  handleSendOrder: () => void;
};

const SubmitSection: FC<TComponentProps> = ({
  totalPrice,
  isDisabled,
  handleSendOrder,
}) => {
  return (
    <div className={s.submitSection}>
      <p className={cn(s.totalPrice, 'text', 'text_type_digits-medium')}>
        {totalPrice}&nbsp;
        <CurrencyIcon type="primary" />
      </p>
      {!isDisabled && (
        <Button type="primary" size="large" onClick={handleSendOrder}>
          Оформить заказ
        </Button>
      )}
    </div>
  );
};

SubmitSection.propTypes = {
  totalPrice: pt.number.isRequired,
  isDisabled: pt.bool.isRequired,
  handleSendOrder: pt.func.isRequired,
};

export default memo(SubmitSection);
