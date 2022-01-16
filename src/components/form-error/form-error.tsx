import { FC } from 'react';
import cn from 'classnames';
import s from './form-error.module.css';

const FormError: FC = ({ children }) => {
  return (
    <p className={cn(s.errorText, 'text', 'text_type_main-default')}>
      {children}
    </p>
  );
};

export default FormError;
