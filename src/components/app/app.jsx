import s from './app.module.css';
import { data } from '../../utils/data';

// Components
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={`${s.container} pb-10`}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
};

export default App;
