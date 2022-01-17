import { FC } from 'react';
import s from './layout.module.css';

// Components
import AppHeader from '../app-header/app-header';

const Layout: FC = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main className={s.mainContainer}>{children}</main>
    </>
  );
};

export default Layout;
