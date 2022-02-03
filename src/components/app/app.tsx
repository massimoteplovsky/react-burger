import { useEffect, useCallback, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import {
  getIngredientsState,
  fetchAllIngredients,
} from '../../services/ducks/ingredients';
import { getAppState } from '../../services/ducks/app';
import { RoutePath } from '../../utils/constants';
import { TIngredient, TOrderPopulated } from '../../utils/prop-validator';

// Components
import Layout from '../layout/layout';
import Loader from '../loader/loader';
import Error from '../error/error';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderInfo from '../order-info/order-info';
import ProtectedRoute from '../protected-route/protected-route';

// Pages
import Home from '../../pages/home/home';
import Registration from '../../pages/registration/registration';
import Login from '../../pages/login/login';
import Profile from '../../pages/profile/profile';
import Ingredient from '../../pages/ingredient/ingredient';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import NotFound from '../../pages/not-found/not-found';
import Feed from '../../pages/feed/feed';
import Order from '../../pages/order/order';

type TLocationItem = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: undefined;
};

type TLocationState = {
  modalLocation: TLocationItem;
  currentIngredient: TIngredient;
  currentOrder: TOrderPopulated;
};

const App: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const modalLocation = location.state?.modalLocation;
  const currentIngredient = location.state?.currentIngredient;
  const currentOrder = location.state?.currentOrder;
  const { isLoading } = useAppSelector(getIngredientsState);
  const { isError } = useAppSelector(getAppState);

  useEffect(() => {
    const fetchIngredients = async () => {
      await dispatch(fetchAllIngredients());
    };
    fetchIngredients();
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    history.goBack();
  }, [history]);

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <Router>
        <Layout>
          <Error>Произошла ошибка на сервере...</Error>
        </Layout>
      </Router>
    );
  }

  return (
    <Layout>
      <Switch location={modalLocation || location}>
        <Route path={RoutePath.HOME} exact>
          <Home />
        </Route>
        <Route path={RoutePath.LOGIN}>
          <Login />
        </Route>
        <Route path={RoutePath.REGISTRATION}>
          <Registration />
        </Route>
        <Route path={RoutePath.FORGOT_PASSWORD}>
          <ForgotPassword />
        </Route>
        <Route path={RoutePath.RESET_PASSWORD}>
          <ResetPassword />
        </Route>
        <ProtectedRoute
          path={[RoutePath.PROFILE, RoutePath.PROFILE_ORDERS]}
          exact
        >
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path={RoutePath.PROFILE_ORDERS_ID(':id')} exact>
          <Order />
        </ProtectedRoute>
        <Route path={RoutePath.FEED} exact>
          <Feed />
        </Route>
        <Route path={RoutePath.FEED_ID(':id')} exact>
          <Order />
        </Route>
        <Route path={RoutePath.INGREDIENT(':id')}>
          <Ingredient />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {modalLocation && (
        <Route path={RoutePath.INGREDIENT(':id')}>
          <Modal
            title="Детали ингредиента"
            isTitled
            titleClasses="text text_type_main-large"
            handleCloseModal={handleCloseModal}
          >
            <IngredientDetails ingredient={currentIngredient} />
          </Modal>
        </Route>
      )}
      {modalLocation && (
        <Route
          path={[RoutePath.FEED_ID(':id'), RoutePath.PROFILE_ORDERS_ID(':id')]}
        >
          <Modal
            title={`#${currentOrder?.number}`}
            titleClasses="text text_type_digits-default mb-10"
            isTitled
            handleCloseModal={handleCloseModal}
          >
            <OrderInfo order={currentOrder} />
          </Modal>
        </Route>
      )}
    </Layout>
  );
};

export default App;
