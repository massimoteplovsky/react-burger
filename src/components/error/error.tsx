import { FC } from 'react';
import s from './error.module.css';
import {
  InfoIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const Error: FC = ({ children }) => {
  const handleReload = (): void => {
    window.location.reload();
  };

  return (
    <div className={s.errorWrapper}>
      <div className={s.errorContainer}>
        <InfoIcon type="primary" />
        <h1 className="text text_type_main-large mb-10">{children}</h1>
        <Button type="primary" size="large" onClick={handleReload}>
          Перезагрузить
        </Button>
      </div>
    </div>
  );
};

export default Error;
