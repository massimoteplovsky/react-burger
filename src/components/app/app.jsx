import { useReducer, useEffect } from 'react';
import s from './app.module.css';
import { AppContext } from '../../services/app-context';
import { ENDPOINT, ApiRoute } from '../../utils/constants';
import appReducer, {
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_ERROR,
} from '../../services/modules/app';

// Components
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Loader from '../loader/loader';
import Error from '../error/error';

// HOC
import withModal from '../hocs/with-modal';

const WithModalBurgerConstructor = withModal(BurgerConstructor);
const WithModalBurgerIngredients = withModal(BurgerIngredients);

const initialAppState = {
  ingredients: [],
  ingredient: null,
  burgerData: {
    bunIngredient: null,
    mainIngredients: [],
  },
  orderNumber: null,
  totalPrice: 0,
  modalType: null,
  loading: true,
  error: false,
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const { loading, error } = state;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${ENDPOINT}/${ApiRoute.INGREDIENTS}`);

        if (response?.ok) {
          const { data: ingredients } = await response.json();
          return dispatch({
            type: FETCH_INGREDIENTS,
            payload: ingredients,
          });
        }

        throw new Error();
      } catch (err) {
        dispatch({
          type: FETCH_INGREDIENTS_ERROR,
        });
      }
    };
    getData();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <AppHeader />
      {error ? (
        <Error>Произошла ошибка при загрузке данных...</Error>
      ) : (
        <main className={`${s.container} pb-10`}>
          <AppContext.Provider value={{ ...state, dispatch }}>
            <WithModalBurgerIngredients />
            <WithModalBurgerConstructor />
          </AppContext.Provider>
        </main>
      )}
    </>
  );
};

export default App;
