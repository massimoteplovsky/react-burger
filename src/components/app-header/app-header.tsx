import { FC, memo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.css';
import { RoutePath } from '../../utils/constants';

const AppHeader: FC = () => {
  return (
    <header className={s.header}>
      <nav className={s.mainNav}>
        <NavLink
          to={RoutePath.HOME}
          className={s.navItem}
          activeClassName={s.navItemActive}
          exact
        >
          <BurgerIcon type="primary" />
          <span className="text text_type_main-default ml-2">Конструктор</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={s.navItem}
          activeClassName={s.navItemActive}
        >
          <ListIcon type="primary" />
          <span className="text text_type_main-default ml-2">
            Лента заказов
          </span>
        </NavLink>
        <Link to={RoutePath.HOME} className={s.logo}>
          <Logo />
        </Link>
        <NavLink
          to={RoutePath.PROFILE}
          className={s.navItem}
          activeClassName={s.navItemActive}
        >
          <ProfileIcon type="primary" />
          <span className="text text_type_main-default ml-2">
            Личный кабинет
          </span>
        </NavLink>
      </nav>
    </header>
  );
};

export default memo(AppHeader);
