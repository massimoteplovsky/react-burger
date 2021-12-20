import { memo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.css';
import { RoutePath } from '../../utils/constants';

const AppHeader = () => {
  return (
    <header className={`${s.header} pt-4 pb-4`}>
      <nav className={s.mainNav}>
        <NavLink
          to={RoutePath.HOME}
          className={`${s.navItem} pt-4 pr-5 pb-4 pl-5 mr-2`}
          activeClassName={s.navItemActive}
          exact
        >
          <BurgerIcon />
          <span className="text text_type_main-default ml-2">Конструктор</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={`${s.navItem} pt-4 pr-5 pb-4 pl-5`}
          activeClassName={s.navItemActive}
        >
          <ListIcon />
          <span className="text text_type_main-default ml-2">
            Лента заказов
          </span>
        </NavLink>
        <Link to={RoutePath.HOME} className={s.logo}>
          <Logo />
        </Link>
        <NavLink
          to={RoutePath.PROFILE}
          className={`${s.navItem} pt-4 pr-5 pb-4 pl-5`}
          activeClassName={s.navItemActive}
        >
          <ProfileIcon />
          <span className="text text_type_main-default ml-2">
            Личный кабинет
          </span>
        </NavLink>
      </nav>
    </header>
  );
};

export default memo(AppHeader);
