import pt from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { RoutePath } from '../../utils/constants';
import { checkAuth } from '../../utils/helpers';

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuth = checkAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: RoutePath.LOGIN,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  children: pt.node.isRequired,
};

export default ProtectedRoute;
