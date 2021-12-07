import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import s from './app.module.css';
import {
  getIngredientsState,
  fetchAllIngredients,
} from '../../services/ducks/ingredients';
import { getAppState } from '../../services/ducks/app';

// Components
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Loader from '../loader/loader';
import Error from '../error/error';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getIngredientsState);
  const { isError } = useSelector(getAppState);

  useEffect(() => {
    const fetchIngredients = async () => {
      await dispatch(fetchAllIngredients());
    };
    fetchIngredients();
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <>
      <AppHeader />
      {isError ? (
        <Error>Произошла ошибка при загрузке данных...</Error>
      ) : (
        <main className={`${s.container} pb-10`}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      )}
    </>
  );
};

export default App;
