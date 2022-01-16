import { FC } from 'react';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './not-found.module.css';

const NotFound: FC = () => {
  return (
    <div className={s.container}>
      <section className={s.notFoundSection}>
        <InfoIcon type="primary" />
        <p className="text text_type_digits-large">404</p>
        <p className="text text_type_main-large">Сраница не найдена</p>
      </section>
    </div>
  );
};

export default NotFound;
