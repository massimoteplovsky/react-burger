import pt from 'prop-types';
import s from './layout.module.css';

// Components
import AppHeader from '../app-header/app-header';

const Layout = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main className={`${s.mainContainer}`}>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: pt.node.isRequired,
};

export default Layout;
