import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={`${s.header} pt-4 pb-4`}>
      <nav className={s.mainNav}>
        <a href="/" className={`${s.navItem} pt-4 pr-5 pb-4 pl-5 mr-2`}>
          <BurgerIcon type="primary" />
          <span className="text text_type_main-default ml-2">Конструктор</span>
        </a>
        <a
          href="/"
          className={`${s.navItem} pt-4 pr-5 pb-4 pl-5 text_color_inactive`}
        >
          <ListIcon type="secondary" />
          <span className="text text_type_main-default ml-2">
            Лента заказов
          </span>
        </a>
        <a href="/" className={s.logo}>
          <Logo />
        </a>
        <a
          href="/"
          className={`${s.navItem} pt-4 pr-5 pb-4 pl-5 text_color_inactive`}
        >
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default ml-2">
            Личный кабинет
          </span>
        </a>
      </nav>
    </header>
  );
};

export default AppHeader;
