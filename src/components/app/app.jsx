import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

// Components
import Layout from '../layout/layout';
import Loader from '../loader/loader';
import Error from '../error/error';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
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

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isModal = location.state?.isModal;
  const currentIngredient = location.state?.ingredient;
  const { isLoading } = useSelector(getIngredientsState);
  const { isError } = useSelector(getAppState);

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
      <Switch location={isModal || location}>
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
        <ProtectedRoute path={RoutePath.PROFILE}>
          <Profile />
        </ProtectedRoute>
        <Route path={RoutePath.INGREDIENT(':id')}>
          <Ingredient />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {isModal && (
        <Route path={RoutePath.INGREDIENT(':id')}>
          <Modal isTitled handleCloseModal={handleCloseModal}>
            <IngredientDetails ingredient={currentIngredient} />
          </Modal>
        </Route>
      )}
    </Layout>
  );
};

export default App;
