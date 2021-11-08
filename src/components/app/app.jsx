import { useState, useEffect } from 'react';
import s from './app.module.css';
import { ModalType } from '../../utils/constants';

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

const ENDPOINT = 'https://norma.nomoreparties.space/api';
const ApiRoute = {
  INGREDIENTS: 'ingredients',
};

const App = () => {
  const [state, setState] = useState({
    ingredients: [],
    loading: true,
    error: false,
  });
  const { ingredients, loading, error } = state;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${ENDPOINT}/${ApiRoute.INGREDIENTS}`);

        if (response?.ok) {
          const { data: ingredients } = await response.json();
          return setState((state) => ({
            ...state,
            ingredients,
            loading: false,
          }));
        }

        throw new Error();
      } catch (err) {
        setState((state) => ({ ...state, loading: false, error: true }));
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
          <WithModalBurgerIngredients
            ingredients={ingredients}
            modalType={ModalType.INGREDIENT}
          />
          <WithModalBurgerConstructor
            ingredients={ingredients}
            modalType={ModalType.ORDER}
          />
        </main>
      )}
    </>
  );
};

export default App;
