import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './loader.module.css';

const Loader = () => {
  return (
    <div className={s.loaderWrapper}>
      <div className={s.logoContainer}>
        <Logo />
        <div className={s.spinner}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
