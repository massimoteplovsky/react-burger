import { useEffect, FC } from 'react';
import {
  NavLink,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import cn from 'classnames';
import s from './profile.module.css';
import {
  getUserState,
  logoutUser,
  fetchUserData,
  resetStatus,
} from '../../services/ducks/user';
import { getAllOrders } from '../../services/ducks/orders';
import { RoutePath } from '../../utils/constants';

// Components
import ProfileForm from '../../components/profile-form/profile-form';
import OrdersList from '../../components/orders-list/orders-list';
import Loader from '../../components/loader/loader';
import { wsAction } from '../../services/ducks/orders';

const Note = {
  [RoutePath.PROFILE]:
    'В этом разделе вы можете изменить свои персональные данные',
  [RoutePath.PROFILE_ORDERS]:
    'В этом разделе вы можете просмотреть свою историю заказов',
};

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const { success, isError } = useAppSelector(getUserState);
  const ordersData = useAppSelector(getAllOrders);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    history.push({ pathname: RoutePath.LOGIN });
  };

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(fetchUserData());
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
      dispatch(wsAction.onClose());
    };
  }, [dispatch]);

  if (isError) {
    return <Redirect to={{ pathname: RoutePath.LOGIN }} />;
  }

  if (!success || !ordersData) return <Loader />;

  return (
    <div className={s.container}>
      <div className={s.profileNav}>
        <NavLink
          to={RoutePath.PROFILE}
          className={cn(s.navItem, 'text', 'text_type_main-medium')}
          activeClassName={s.navItemActive}
          exact
        >
          Профиль
        </NavLink>
        <NavLink
          to={RoutePath.PROFILE_ORDERS}
          className={cn(s.navItem, 'text', 'text_type_main-medium')}
          activeClassName={s.navItemActive}
        >
          История заказов
        </NavLink>
        <button
          className={cn(s.navBtn, 'text', 'text_type_main-medium')}
          onClick={handleLogout}
        >
          Выход
        </button>
        <span className="text text_type_main-small text_color_inactive">
          {Note[location.pathname]}
        </span>
      </div>
      <div className={s.content}>
        <Switch>
          <Route path={RoutePath.PROFILE} exact>
            <ProfileForm />
          </Route>
          <Route path={RoutePath.PROFILE_ORDERS} exact>
            <OrdersList orders={ordersData.orders} isShownOrderStatus />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Profile;
