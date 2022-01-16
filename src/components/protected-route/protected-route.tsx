import { FC, ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RoutePath } from '../../utils/constants';
import { checkAuth } from '../../utils/helpers';

type TComponentProps = {
  children: ReactNode;
  path: string | string[];
  exact?: boolean;
};

const ProtectedRoute: FC<TComponentProps> = ({ children, ...rest }) => {
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

export default ProtectedRoute;
